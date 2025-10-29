import { ApiProperty } from '@nestjs/swagger';

export class LikePostRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13',
  })
  id!: string;

  @ApiProperty({
    description: 'The uniq post ID',
    example: '13',
  })
  postId!: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  userId!: string;
}
