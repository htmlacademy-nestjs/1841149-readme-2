import {BasePostRdo} from "./base-post.rdo";
import {PostType} from "@project/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class TextPostRdo extends BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  type!: PostType.Text;

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  title!: string;

  @Expose()
  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description'
  })
  announce!: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat'
  })
  text!: string;
}
