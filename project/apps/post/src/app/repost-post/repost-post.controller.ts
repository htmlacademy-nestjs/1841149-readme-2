import {Controller, Delete, Get, HttpStatus, Param} from "@nestjs/common";
import {RepostPostService} from "./repost-post.service";
import {ApiResponse} from "@nestjs/swagger";

@Controller('repost-post')
export class RepostPostController {
  constructor(
    private readonly repostPostService: RepostPostService
  ) {}

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully create a repost',
  })
  @Get(':postId')
  public async addRepost(@Param('postId') postId: string) {
    await this.repostPostService.create(postId);
  }


  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully delete a repost',
  })
  @Delete(':postId')
  public async deleteRepost(@Param('postId') postId: string) {
    await this.repostPostService.delete(postId);
  }
}
