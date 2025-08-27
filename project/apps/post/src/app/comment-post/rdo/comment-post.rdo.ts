import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13',
  })
  id!: number;

  @Expose()
  @ApiProperty({
    description: 'Comment author',
    example: '{ id: "123" }',
  })
  author!: string;

  @Expose()
  @ApiProperty({
    description: 'Comment text',
    example: 'What about summer?',
  })
  text!: string;

  @Expose()
  @ApiProperty({
    description: 'Comment create date',
    example: '2025-08-11T07:01:32.001Z',
  })
  createdAt!: string;
}
