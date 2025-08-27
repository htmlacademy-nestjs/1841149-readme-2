import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  @IsString()
  @IsMongoId()
  public authorId!: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'I want to buy this thing',
  })
  text!: string;
}
