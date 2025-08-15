import {CreatePostDto} from "./create-post.dto";
import {PostType} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  type!: PostType.Text;

  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  title!: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description'
  })
  announce!: string;

  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat'
  })
  text!: string;
}
