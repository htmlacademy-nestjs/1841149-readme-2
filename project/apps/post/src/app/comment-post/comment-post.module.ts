import { Module } from '@nestjs/common';
import {CommentPostController} from "./comment-post.controller";
import {CommentPostRepository} from "./comment-post.repository";
import {CommentPostService} from "./comment-post.service";
import {BlogPostModule} from "../blog-post/blog-post.module";
import {PrismaClientModule} from "@project/models";

@Module({
  imports: [BlogPostModule, PrismaClientModule],
  controllers: [CommentPostController],
  providers: [CommentPostService, CommentPostRepository],
})
export class CommentPostModule {}
