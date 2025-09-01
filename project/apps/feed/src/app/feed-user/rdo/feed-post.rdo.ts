import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FeedPostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq post ID',
    example: '13',
  })
  public id!: string;
}
