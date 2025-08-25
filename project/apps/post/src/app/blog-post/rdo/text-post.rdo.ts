import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class TextPostRdo {
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
