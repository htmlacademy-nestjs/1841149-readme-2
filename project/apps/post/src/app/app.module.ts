import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentPostModule } from './comment-post/comment-post.module';
import { LikePostModule } from './like-post/like-post.module';
import { TagPostModule } from './tag-post/tag-post.module';
import { NotificationModule } from './notification/notification.module';
import { PostConfigModule } from '@project/post-config';

@Module({
  imports: [
    BlogPostModule,
    CommentPostModule,
    LikePostModule,
    TagPostModule,
    PostConfigModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
