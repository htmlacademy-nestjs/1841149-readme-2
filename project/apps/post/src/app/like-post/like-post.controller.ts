import { Controller, Delete, HttpStatus, Param, Post } from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { fillDto } from '@project/helpers';
import { LikePostRdo } from './rdo/like-post.rdo';
import { ApiResponse } from '@nestjs/swagger';

@Controller('posts/:postId/likes')
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}

  @ApiResponse({
    type: LikePostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully add like to post',
  })
  @Post('/')
  public async setLike(@Param('postId') postId: string) {
    const newLike = await this.likePostService.create(postId);

    return fillDto(LikePostRdo, newLike.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully delete like from post',
  })
  @Delete(':id')
  public async deleteLike(
    @Param('postId') postId: string,
    @Param('id') id: string
  ) {
    await this.likePostService.delete(postId, id);
  }
}
