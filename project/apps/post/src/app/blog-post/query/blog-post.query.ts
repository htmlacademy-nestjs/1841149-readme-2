import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { SortDirection, PostState, SortType } from '@project/types';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostConstants } from '../blog-post.constants';

export class BlogPostQuery {
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

  @IsUUID('all', { each: true })
  @IsOptional()
  public 'tags[]'?: string[];

  @IsOptional()
  @ApiProperty({
    description: 'Author id',
    example: '123',
  })
  public 'authorId[]'?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Post status',
    example: 'draft',
  })
  public status = PostState.Publised;

  @IsIn(Object.values(SortType))
  @ApiProperty({
    description: 'Sort by',
    example: 'likeCount or commentCount',
  })
  public sortBy: string = BlogPostConstants.DEFAULT_SORT_TYPE;

  @IsIn(Object.values(SortDirection))
  @ApiProperty({
    description: 'Sort direction',
    example: 'asc or desc',
  })
  public sortDirection: string = BlogPostConstants.DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || BlogPostConstants.DEFAULT_PAGE_COUNT)
  @IsOptional()
  @ApiProperty({
    description: 'Pagination page',
    example: '2',
  })
  public page: number = BlogPostConstants.DEFAULT_PAGE_COUNT;
}
