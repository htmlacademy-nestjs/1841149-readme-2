import { Transform } from 'class-transformer';
import { BlogPostConstants } from '../blog-post.constants';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostTypeQuery {
  @Transform(
    ({ value }) => +value || BlogPostConstants.DEFAULT_POST_COUNT_LIMIT
  )
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Posts count per page',
    example: '50',
  })
  public limit = BlogPostConstants.DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => +value || BlogPostConstants.DEFAULT_PAGE_COUNT)
  @IsOptional()
  @ApiProperty({
    description: 'Pagination page',
    example: '2',
  })
  public page: number = BlogPostConstants.DEFAULT_PAGE_COUNT;
}
