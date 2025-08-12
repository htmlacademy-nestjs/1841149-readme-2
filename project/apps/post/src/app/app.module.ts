import { Module } from '@nestjs/common';
import {BlogPostModule} from "./blog-post/blog-post.module";
import {CommentPostModule} from "./comment-post/comment-post.module";
import {LikePostModule} from "./like-post/like-post.module";
import {RepostPostModule} from "./repost-post/repost-post.module";

@Module({
  imports: [BlogPostModule, CommentPostModule, LikePostModule, RepostPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
