import {Module} from "@nestjs/common";
import {PrismaClientModule} from "@project/models";
import {TagPostRepository} from "./tag-post.repository";
import {TagPostService} from "./tag-post.service";

@Module({
  imports: [PrismaClientModule],
  providers: [TagPostRepository, TagPostService],
  exports: [TagPostService]
})
export class TagPostModule {}
