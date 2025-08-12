import { Module } from '@nestjs/common';
import {LikePostController} from "./like-post.controller";
import {LikePostService} from "./like-post.service";
import {LikePostRepository} from "./like-post.repository";

@Module({
  controllers: [LikePostController],
  providers: [LikePostService, LikePostRepository],
})
export class LikePostModule {}
