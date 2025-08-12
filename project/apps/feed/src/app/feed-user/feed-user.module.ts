import { Module } from '@nestjs/common';
import {FeedUserController} from "./feed-user.controller";
import {FeedUserService} from "./feed-user.service";

@Module({
  providers: [FeedUserService],
  controllers: [FeedUserController],
})
export class FeedUserModule {}

