import {Body, Controller, Delete, Get, HttpStatus, Param, Post} from "@nestjs/common";
import {CommentPostService} from "./comment-post.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {fillDto} from "@project/libs/shared/helpers";
import {CommentPostRdo} from "./rdo/comment-post.rdo";
import {ApiResponse} from "@nestjs/swagger";

@Controller('comment')
export class CommentPostController {
  constructor(
    private readonly commentPostService: CommentPostService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of comments to post',
  })
  @Get(':id')
  public async index(@Param('id') id: string) {
    const comments = await this.commentPostService.getComments(id);

    return fillDto(CommentPostRdo, { entities: comments });
  }

  @ApiResponse({
    type: CommentPostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created a comment to post',
  })
  @Post(':id')
  public async createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentPostService.create(id, dto);

    return fillDto(CommentPostRdo, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully deleted a comment to post',
  })
  @Delete(':id')
  public async deleteComment(@Param('id') id: string) {
    await this.commentPostService.deleteComment(id)
  }
}
