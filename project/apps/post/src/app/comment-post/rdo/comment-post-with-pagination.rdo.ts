import { Expose } from 'class-transformer';
import { CommentPostRdo } from './comment-post.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPostWithPaginationRdo {
  @Expose()
  @ApiProperty({
    description: 'Comments lis',
    example:
      '{ id: "123", text: "this is a comment", authorId: "123123", postId: "123123" }',
  })
  public entities!: CommentPostRdo[];

  @Expose()
  @ApiProperty({
    description: 'Total pages',
    example: '1',
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Total comments',
    example: '100',
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Current page',
    example: '1',
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'Items per page',
    example: '50',
  })
  public itemsPerPage!: number;
}
