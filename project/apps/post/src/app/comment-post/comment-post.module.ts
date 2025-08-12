import { Module } from '@nestjs/common';
import {CommentPostController} from "./comment-post.controller";
import {CommentPostRepository} from "./comment-post.repository";
import {CommentPostService} from "./comment-post.service";

@Module({
  controllers: [CommentPostController],
  providers: [CommentPostService, CommentPostRepository],
})
export class CommentPostModule {}
