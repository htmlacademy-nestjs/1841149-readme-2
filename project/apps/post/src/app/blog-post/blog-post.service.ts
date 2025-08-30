import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { TagPostService } from '../tag-post/tag-post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { PaginationResult, PostType } from '@project/types';
import { BlogPostTypeQuery } from './query/blog-post-type.query';
import { BlogPostSearchQuery } from './query/blog-post-search.query';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly tagPostService: TagPostService
  ) {}

  public async getAllPosts(
    query: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async getPostByType(query: BlogPostTypeQuery, type: PostType) {
    return this.blogPostRepository.findByType(query, type);
  }

  public async searchByTitle(
    query: BlogPostSearchQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.searchByTitle(query);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async create(dto: CreatePostDto) {
    const tags = await this.tagPostService.getTagsByNamesOrCreate(
      dto.tags ?? []
    );

    const newPost = BlogPostEntity.fromDTO(dto, tags);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async show(id: string) {
    const post = await this.blogPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return post;
  }

  public async update(dto: UpdatePostDto) {
    const existsPost = await this.blogPostRepository.findById(dto.id);
    let hasChanges = false;
    let isSameTags = true;

    if (!existsPost) {
      throw new NotFoundException(`Post with id ${dto.id} not found.`);
    }

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags') {
        const typedKey = key as keyof BlogPostEntity;
        if (existsPost[typedKey] !== value) {
          (existsPost as any)[typedKey] = value;
          hasChanges = true;
        }
      }

      if (key === 'tags' && value) {
        const currentTagNames = existsPost.tags.map((tag) => tag.title);
        isSameTags =
          currentTagNames.length === value.length &&
          currentTagNames.some((tagTitle) => value.includes(tagTitle));

        if (!isSameTags && dto.tags) {
          existsPost.tags = await this.tagPostService.getTagsByNamesOrCreate(
            dto.tags
          );
        }
      }
    }

    if (!hasChanges && isSameTags) {
      return existsPost;
    }

    return this.blogPostRepository.updateById(dto.id, existsPost);
  }

  public async delete(id: string) {
    await this.blogPostRepository.deleteById(id);
  }

  public async repost(id: string, userId: string) {
    return this.blogPostRepository.createRepost(id, userId);
  }
}
