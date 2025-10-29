import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentRdo } from './created-comment.rdo';

export class CommentsWithPaginationRdo {
  @ApiProperty({
    description: 'Comments lis',
    example:
      '{ id: "123", text: "this is a comment", authorId: "123123", postId: "123123" }',
  })
  public entities!: CreateCommentRdo;

  @ApiProperty({
    description: 'Total pages',
    example: '1',
  })
  public totalPages!: number;

  @ApiProperty({
    description: 'Total comments',
    example: '100',
  })
  public totalItems!: number;

  @ApiProperty({
    description: 'Current page',
    example: '1',
  })
  public currentPage!: number;

  @ApiProperty({
    description: 'Items per page',
    example: '50',
  })
  public itemsPerPage!: number;
}
