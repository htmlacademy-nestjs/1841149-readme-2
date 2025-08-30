import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { fillDto } from '@project/helpers';
import { LikePostRdo } from './rdo/like-post.rdo';
import { ApiResponse } from '@nestjs/swagger';

// TODO брать userId из заголовка
// TODO проверка токена

@Controller('posts/:postId/likes')
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}

  @ApiResponse({
    type: LikePostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully add like to post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Like already exists.',
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  public async deleteLike(@Param('postId') postId: string) {
    await this.likePostService.delete(postId, '1');
  }
}
