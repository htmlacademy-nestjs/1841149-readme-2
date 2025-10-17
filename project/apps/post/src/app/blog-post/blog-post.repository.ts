import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaClientService } from '@project/models';
import { PostType, SortType, FlatPost, PostUnion } from '@project/types';
import { BlogPostQuery } from './query/blog-post.query';
import { PaginationResult, SortDirection } from '@project/types';
import { Prisma, QueryMode } from '@prisma/client';
import { BlogPostTypeQuery } from './query/blog-post-type.query';
import { BlogPostSearchQuery } from './query/blog-post-search.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  PostUnion
> {
  constructor(protected override readonly client: PrismaClientService) {
    super(client, BlogPostEntity.fromObject);
  }

  public override async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const objectEntity = entity.toObject();

    const record = await this.client.post.create({
      data: {
        type: objectEntity.type,
        status: objectEntity.status,
        repost: objectEntity.repost,
        authorId: entity.authorId,
        tags: {
          connect: objectEntity.tags?.map(({ id }) => ({ id })),
        },
      },
    });

    entity.id = record.id;

    await this.createTypeSpecificRecord(entity.id, objectEntity);

    return entity;
  }

  private async createTypeSpecificRecord(
    postId: string,
    postData: FlatPost
  ): Promise<void> {
    switch (postData.type) {
      case PostType.VIDEO:
        await this.client.videoPost.create({
          data: {
            postId,
            title: postData.title!,
            videoLink: postData.videoLink!,
          },
        });
        break;

      case PostType.TEXT:
        await this.client.textPost.create({
          data: {
            postId,
            title: postData.title!,
            announce: postData.announce!,
            text: postData.text!,
          },
        });
        break;

      case PostType.QUOTE:
        await this.client.quotePost.create({
          data: {
            postId,
            quote: postData.quote!,
            quoteAuthor: postData.quoteAuthor!,
          },
        });
        break;

      case PostType.PHOTO:
        await this.client.photoPost.create({
          data: {
            postId,
            photoLink: postData.photo!,
          },
        });
        break;

      case PostType.LINK:
        await this.client.linkPost.create({
          data: {
            postId,
            link: postData.link!,
            description: postData.description,
          },
        });
        break;
    }
  }

  private async updateTypeSpecificRecord(
    postId: string,
    postData: FlatPost
  ): Promise<void> {
    switch (postData.type) {
      case PostType.VIDEO:
        await this.client.videoPost.update({
          where: {
            postId,
          },
          data: {
            postId,
            title: postData.title,
            videoLink: postData.videoLink,
          },
        });
        break;

      case PostType.TEXT:
        await this.client.textPost.update({
          where: {
            postId,
          },
          data: {
            postId,
            title: postData.title,
            announce: postData.announce,
            text: postData.text,
          },
        });
        break;

      case PostType.QUOTE:
        await this.client.quotePost.update({
          where: {
            postId,
          },
          data: {
            postId,
            quote: postData.quote,
            quoteAuthor: postData.quoteAuthor,
          },
        });
        break;

      case PostType.PHOTO:
        await this.client.photoPost.update({
          where: {
            postId,
          },
          data: {
            postId,
            photoLink: postData.photo,
          },
        });
        break;

      case PostType.LINK:
        await this.client.linkPost.update({
          where: {
            postId,
          },
          data: {
            postId,
            link: postData.link,
            description: postData.description,
          },
        });
        break;
    }
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public override async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        videoPost: true,
        textPost: true,
        linkPost: true,
        photoPost: true,
        quotePost: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as unknown as BlogPostEntity);
  }

  public async searchByTitle(
    query: BlogPostSearchQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    const searchCondition = {
      title: {
        contains: query.title,
        mode: QueryMode.insensitive,
      },
    };

    const [videoRecords, textRecords] = await Promise.all([
      this.client.videoPost.findMany({ where: searchCondition }),
      this.client.textPost.findMany({ where: searchCondition }),
    ]);

    const matchPostIds = [...videoRecords, ...textRecords].map(
      (record) => record.postId
    );

    const posts = await this.client.post.findMany({
      where: {
        id: {
          in: matchPostIds,
        },
      },
      orderBy,
      skip,
      take,
      include: {
        tags: true,
        comments: true,
        likes: true,
        videoPost: true,
        textPost: true,
        linkPost: true,
        photoPost: true,
        quotePost: true,
      },
    });

    const postCount = posts.length;

    return {
      entities: posts.map((record) =>
        this.createEntityFromDocument(record as unknown as BlogPostEntity)
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async updateById(
    id: string,
    entity: BlogPostEntity
  ): Promise<BlogPostEntity> {
    const objectEntity = entity.toObject();
    const updatedPost = await this.client.post.update({
      where: {
        id,
      },
      data: {
        type: objectEntity.type,
        status: objectEntity.status,
        repost: objectEntity.repost,
        authorId: entity.authorId,
        tags: {
          connect: objectEntity.tags?.map(({ id }) => ({ id })),
        },
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        videoPost: true,
        textPost: true,
        linkPost: true,
        photoPost: true,
        quotePost: true,
      },
    });

    await this.updateTypeSpecificRecord(id, objectEntity);

    return this.createEntityFromDocument(
      updatedPost as unknown as BlogPostEntity
    );
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(
    query: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    const getSortOrder = (direction: string): SortDirection => {
      return direction.toLowerCase() === 'desc'
        ? SortDirection.Desc
        : SortDirection.Asc;
    };

    if (query['tags[]'] !== undefined) {
      const tags = Array.isArray(query['tags[]'])
        ? query['tags[]']
        : [query['tags[]']];
      where.tags = {
        some: {
          id: {
            in: tags,
          },
        },
      };
    }

    if (query?.sortBy && query?.sortDirection) {
      switch (query.sortBy) {
        case SortType.LIKE:
          orderBy.likes = { _count: getSortOrder(query.sortDirection) };
          break;
        case SortType.COMMENTS:
          orderBy.comments = { _count: getSortOrder(query.sortDirection) };
          break;
        case SortType.CREATED:
        default:
          orderBy.createdAt = getSortOrder(query.sortDirection);
          break;
      }
    } else if (query?.sortDirection) {
      orderBy.createdAt = getSortOrder(query.sortDirection);
    }

    if (query?.authorId) {
      where.authorId = query.authorId;
    }

    where.status = query.status;

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          comments: true,
          likes: true,
          videoPost: true,
          textPost: true,
          linkPost: true,
          photoPost: true,
          quotePost: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as unknown as BlogPostEntity)
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async findByType(
    query: BlogPostTypeQuery,
    type: PostType
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    where.type = type;

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          comments: true,
          likes: true,
          videoPost: true,
          textPost: true,
          linkPost: true,
          photoPost: true,
          quotePost: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as unknown as BlogPostEntity)
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async createRepost(id: string, userId: string) {
    const existPost = await this.client.post.findFirst({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!existPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    if (existPost.authorId === userId) {
      throw new BadRequestException('Cannot repost your own post');
    }

    const existingRepost = await this.client.post.findFirst({
      where: {
        authorId: userId,
        originalPostId: existPost.id,
        repost: true,
      },
    });

    if (existingRepost) {
      throw new ConflictException('You have already reposted this post');
    }

    let postTypeData: any = null;
    switch (existPost.type) {
      case 'video':
        postTypeData = await this.client.videoPost.findFirst({
          where: { postId: existPost.id },
        });
        break;
      case 'text':
        postTypeData = await this.client.textPost.findFirst({
          where: { postId: existPost.id },
        });
        break;
      case 'quote':
        postTypeData = await this.client.quotePost.findFirst({
          where: { postId: existPost.id },
        });
        break;
      case 'photo':
        postTypeData = await this.client.photoPost.findFirst({
          where: { postId: existPost.id },
        });
        break;
      case 'link':
        postTypeData = await this.client.linkPost.findFirst({
          where: { postId: existPost.id },
        });
        break;
    }

    const newPost = await this.client.post.create({
      data: {
        type: existPost.type,
        status: existPost.status,
        authorId: userId,
        repost: true,
        originalAuthorId: existPost.authorId,
        originalPostId: existPost.id,
        repostCreatedAt: new Date(),
        tags: {
          connect: existPost.tags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
        videoPost: true,
        textPost: true,
        quotePost: true,
        photoPost: true,
        linkPost: true,
      },
    });

    switch (existPost.type) {
      case 'video':
        if (postTypeData) {
          await this.client.videoPost.create({
            data: {
              title: postTypeData.title,
              videoLink: postTypeData.videoLink,
              postId: newPost.id,
            },
          });
        }
        break;
      case 'text':
        if (postTypeData) {
          await this.client.textPost.create({
            data: {
              title: postTypeData.title,
              announce: postTypeData.announce,
              text: postTypeData.text,
              postId: newPost.id,
            },
          });
        }
        break;
      case 'quote':
        if (postTypeData) {
          await this.client.quotePost.create({
            data: {
              quote: postTypeData.quote,
              quoteAuthor: postTypeData.quoteAuthor,
              postId: newPost.id,
            },
          });
        }
        break;
      case 'photo':
        if (postTypeData) {
          await this.client.photoPost.create({
            data: {
              photoLink: postTypeData.photoLink,
              postId: newPost.id,
            },
          });
        }
        break;
      case 'link':
        if (postTypeData) {
          await this.client.linkPost.create({
            data: {
              description: postTypeData.description,
              link: postTypeData.link,
              postId: newPost.id,
            },
          });
        }
        break;
    }

    const completePost = await this.client.post.findUnique({
      where: { id: newPost.id },
      include: {
        tags: true,
        videoPost: true,
        textPost: true,
        quotePost: true,
        photoPost: true,
        linkPost: true,
      },
    });

    return this.createEntityFromDocument(
      completePost as unknown as BlogPostEntity
    );
  }
}
