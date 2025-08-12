import { Module } from '@nestjs/common';
import {FeedUserModule} from "./feed-user/feed-user.module";

@Module({
  imports: [FeedUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
