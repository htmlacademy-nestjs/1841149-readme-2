import { Injectable } from '@nestjs/common';
import { CommentPostEntity } from './comment-post.entity';
import { CommentPostRepository } from './comment-post.repository';
import { BlogPostService } from '../blog-post/blog-post.service';
import { PaginationResult } from '@project/types';
import { CommentPostQuery } from './query/comment-post.query';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentPostService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository,
    private readonly blogPostService: BlogPostService
  ) {}

  public async getComments(
    postId: string,
    query: CommentPostQuery
  ): Promise<PaginationResult<CommentPostEntity>> {
    return this.commentPostRepository.findByPostId(postId, query);
  }

  public async create(postId: string, dto: CreateCommentDto) {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = CommentPostEntity.fromDto(dto, existsPost.id!);
    return this.commentPostRepository.save(newComment);
  }

  public async deleteComment(commentId: string) {
    await this.commentPostRepository.deleteById(commentId);
  }
}
