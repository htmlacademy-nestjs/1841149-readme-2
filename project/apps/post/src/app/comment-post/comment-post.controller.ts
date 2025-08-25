import {Body, Controller, Delete, Get, HttpStatus, Param, Post} from "@nestjs/common";
import {CommentPostService} from "./comment-post.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {fillDto} from "@project/helpers";
import {CommentPostRdo} from "./rdo/comment-post.rdo";
import {ApiResponse} from "@nestjs/swagger";

@Controller('posts/:postId/comments')
export class CommentPostController {
  constructor(
    private readonly commentPostService: CommentPostService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of comments to post',
  })
  @Get('/')
  public async index(@Param('postId') postId: string) {
    const comments = await this.commentPostService.getComments(postId);

    return fillDto(CommentPostRdo, comments.map(comment => comment.toObject()));
  }

  @ApiResponse({
    type: CommentPostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created a comment to post',
  })
  @Post('/')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentPostService.create(postId, dto);

    return fillDto(CommentPostRdo, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully deleted a comment to post',
  })
  @Delete(':id')
  public async deleteComment(@Param('id') id: string) {
    console.log('deleting comment', id);
    await this.commentPostService.deleteComment(id)
  }
}
