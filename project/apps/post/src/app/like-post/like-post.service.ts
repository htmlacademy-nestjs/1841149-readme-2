import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikePostRepository } from './like-post.repository';
import { LikePostEntity } from './like-post.entity';
import { BlogPostService } from '../blog-post/blog-post.service';

@Injectable()
export class LikePostService {
  constructor(
    private readonly likePostRepository: LikePostRepository,
    private readonly blogPostService: BlogPostService
  ) {}

  public async create(postId: string, userId: string): Promise<LikePostEntity> {
    const existPost = await this.blogPostService.getPost(postId);

    if (!existPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const existLike = (await this.likePostRepository.findByPostId(postId)).at(
      0
    );

    if (existLike) {
      throw new ConflictException(
        `Like for post with id: ${postId} already exist`
      );
    }

    const newLike = new LikePostEntity({
      postId,
      userId,
    });

    await this.likePostRepository.save(newLike);

    return newLike;
  }

  public async delete(postId: string, userId: string) {
    const existPost = await this.blogPostService.getPost(postId);

    if (!existPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const existLike = await this.likePostRepository.findByUserAndPostIds(
      postId,
      userId
    );

    if (!existLike) {
      throw new NotFoundException(
        `Like for post with id: ${postId} does not exist`
      );
    }

    return await this.likePostRepository.deleteById(existLike.id!);
  }
}
