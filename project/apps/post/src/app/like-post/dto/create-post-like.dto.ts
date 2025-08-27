import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostLikeDto {
  @ApiProperty({
    description: 'Liked post id',
    example: '123',
  })
  @IsString()
  public postId!: string;

  @ApiProperty({
    description: 'Liked user id',
    example: '123',
  })
  @IsString()
  public userId!: string;
}
