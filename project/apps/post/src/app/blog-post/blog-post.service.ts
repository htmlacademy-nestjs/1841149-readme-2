import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostUnionDto } from './dto/create-post-union.dto';
import { TagPostService } from '../tag-post/tag-post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { PaginationResult } from '../../../../../.nx/cache/971126399865429676/libs/shared/types/dist';

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

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async create(dto: CreatePostUnionDto) {
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

    if (!existsPost) {
      throw new NotFoundException(`Post with id ${dto.id} not found.`);
    }

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    return this.blogPostRepository.updateById(dto.id, existsPost);
  }

  public async delete(id: string) {
    await this.blogPostRepository.deleteById(id);
  }
}
