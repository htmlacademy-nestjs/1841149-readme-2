import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13',
  })
  id!: number;

  @ApiProperty({
    description: 'Comment author',
    example: '123',
  })
  authorId!: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'What about summer?',
  })
  text!: string;

  @ApiProperty({
    description: 'Comment create date',
    example: '2025-08-11T07:01:32.001Z',
  })
  createdAt!: string;
}
