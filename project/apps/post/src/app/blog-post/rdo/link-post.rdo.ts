import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LinkPostRdo {
  @Expose()
  @ApiProperty({
    description: 'Link',
    example: 'google.com',
  })
  link!: string;

  @Expose()
  @ApiProperty({
    description: 'Description to post',
    example: 'test description',
  })
  description!: string;
}
