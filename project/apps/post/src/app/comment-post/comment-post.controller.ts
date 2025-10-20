import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentPostService } from './comment-post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillDto } from '@project/helpers';
import { CommentPostRdo } from './rdo/comment-post.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { CommentPostQuery } from './query/comment-post.query';
import { CommentPostWithPaginationRdo } from './rdo/comment-post-with-pagination.rdo';

// TODO брать userID из заголовка
// TODO проверка авторизации
// TODO проверка удаления только своего комментария

@Controller('posts/:postId/comments')
export class CommentPostController {
  constructor(private readonly commentPostService: CommentPostService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of comments to post',
    type: CommentPostWithPaginationRdo,
  })
  @Get('/')
  public async index(
    @Query() query: CommentPostQuery,
    @Param('postId') postId: string
  ) {
    const commentsWithPagination = await this.commentPostService.getComments(
      postId,
      query
    );

    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toObject()
      ),
    };

    return fillDto(CommentPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: CommentPostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created a comment to post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Comment already exists.',
  })
  @Post('/')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentPostService.create(postId, dto);

    return fillDto(CommentPostRdo, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully deleted a comment to post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteComment(
    @Param('id') id: string,
    @Headers('X-UserId') userId: string
  ) {
    await this.commentPostService.deleteComment(id, userId);
  }
}
