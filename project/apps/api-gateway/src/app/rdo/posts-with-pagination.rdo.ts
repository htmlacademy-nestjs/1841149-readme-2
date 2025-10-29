import { ApiProperty } from '@nestjs/swagger';
import { BasePostRdo } from './base-post.rdo';

export class PostsWithPaginationRdo {
  @ApiProperty({
    description: 'User unique address',
    example: [
      {
        id: '123',
        type: 'photo',
        tags: ['test', 'test2'],
        status: 'published',
        createdAt: '2025-10-21T22:03:51.070Z',
        updatedAt: '2025-10-21T22:03:51.070Z',
        likeCount: 0,
        commentCount: 0,
        photo: 'https://youtube222.com/watch?v=abc123',
        author: {
          id: '689efd96f5034fd62e52f7dc',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@test.com',
        },
      },
    ],
  })
  public entities!: BasePostRdo[];

  @ApiProperty({
    description: 'Total page number',
    example: '1',
  })
  public totalPages!: number;

  @ApiProperty({
    description: 'Total items',
    example: '10',
  })
  public totalItems!: number;

  @ApiProperty({
    description: 'Current page number',
    example: '1',
  })
  public currentPage!: number;

  @ApiProperty({
    description: 'Items per page',
    example: '1',
  })
  public itemsPerPage!: number;
}
