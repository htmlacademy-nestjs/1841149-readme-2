import {Module} from "@nestjs/common";
import {RepostPostController} from "./repost-post.controller";
import {RepostPostService} from "./repost-post.service";
import {RepostPostRepository} from "./repost-post.repository";

@Module({
  controllers: [RepostPostController],
  providers: [RepostPostService, RepostPostRepository],
})
export class RepostPostModule {}
