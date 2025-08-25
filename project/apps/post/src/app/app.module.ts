import { Module } from '@nestjs/common';
import {BlogPostModule} from "./blog-post/blog-post.module";
import {CommentPostModule} from "./comment-post/comment-post.module";
import {LikePostModule} from "./like-post/like-post.module";
import {TagPostModule} from "./tag-post/tag-post.module";

@Module({
  imports: [
    BlogPostModule,
    CommentPostModule,
    LikePostModule,
    TagPostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
