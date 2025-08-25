import { Module } from '@nestjs/common';
import {BlogPostController} from "./blog-post.controller";
import {BlogPostService} from "./blog-post.service";
import {BlogPostRepository} from "./blog-post.repository";
import {TagPostModule} from "../tag-post/tag-post.module";

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  imports: [TagPostModule],
  exports: [BlogPostService]
})
export class BlogPostModule {}
