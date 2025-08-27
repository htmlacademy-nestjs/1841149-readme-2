import { Module } from '@nestjs/common';
import { LikePostController } from './like-post.controller';
import { LikePostService } from './like-post.service';
import { LikePostRepository } from './like-post.repository';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [BlogPostModule, PrismaClientModule],
  controllers: [LikePostController],
  providers: [LikePostService, LikePostRepository],
  exports: [LikePostService],
})
export class LikePostModule {}
