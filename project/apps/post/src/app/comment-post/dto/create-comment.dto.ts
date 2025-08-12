import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'I want to buy this thing'
  })
  text: string;
}
