import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CommentPostConstants } from '../comment-post.constants';

export class CommentPostQuery {
  @Transform(
    ({ value }) => +value || CommentPostConstants.DEFAULT_COMMENT_COUNT
  )
  @IsNumber()
  @IsOptional()
  public limit = CommentPostConstants.DEFAULT_COMMENT_COUNT;

  @Transform(({ value }) => +value || CommentPostConstants.DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = CommentPostConstants.DEFAULT_PAGE_COUNT;
}
