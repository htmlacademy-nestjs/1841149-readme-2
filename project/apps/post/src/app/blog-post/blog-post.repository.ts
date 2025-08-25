import {Injectable, NotFoundException} from "@nestjs/common";
import {BasePostgresRepository} from "@project/core";
import {BlogPostEntity} from "./blog-post.entity";
import {PrismaClientService} from "@project/models";
import { PostUnion, PostType } from "@project/types"
import {BlogPostQuery} from "./query/blog-post.query";
import {PaginationResult} from "../../../../../.nx/cache/971126399865429676/libs/shared/types/dist";
import {Prisma} from "@prisma/client";

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, PostUnion> {
  constructor(
    protected override readonly client: PrismaClientService,
  ) {
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
          connect: objectEntity.tags?.map(({id}) => ({ id }))
        },
      },
    })

    entity.id = record.id;

    await this.createTypeSpecificRecord(entity.id, objectEntity);

    return entity;
  }

  private async createTypeSpecificRecord(
    postId: string,
    postData: PostUnion
  ): Promise<void> {
    switch (postData.type) {
      case PostType.VIDEO:
        await this.client.videoPost.create({
          data: {
            postId,
            title: postData.title,
            videoLink: postData.videoLink,
          }
        });
        break;

      case PostType.TEXT:
        await this.client.textPost.create({
          data: {
            postId,
            title: postData.title,
            announce: postData.announce,
            text: postData.text,
          }
        });
        break;

      case PostType.QUOTE:
        await this.client.quotePost.create({
          data: {
            postId,
            quote: postData.quote,
            quoteAuthor: postData.quoteAuthor,
          }
        });
        break;

      case PostType.PHOTO:
        await this.client.photoPost.create({
          data: {
            postId,
            photoLink: postData.photo,
          }
        });
        break;

      case PostType.LINK:
        await this.client.linkPost.create({
          data: {
            postId,
            link: postData.link,
            description: postData.description,
          }
        });
        break;
    }
  }

  private async updateTypeSpecificRecord(
    postId: string,
    postData: PostUnion
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
          }
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
          }
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
          }
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
          }
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
          }
        });
        break;
    }
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    })
  }

  public override async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        videoPost: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async updateById(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
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
          connect: objectEntity.tags?.map(({id}) => ({ id }))
        },
      }
    })

    await this.updateTypeSpecificRecord(id, objectEntity);

    return this.createEntityFromDocument(updatedPost);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query['tags[]'] !== undefined) {
      const tags = Array.isArray(query['tags[]']) ? query['tags[]'] : [query['tags[]']];
      where.tags = {
        some: {
          id: {
            in: tags
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          tags: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
