import {CreatePostDto} from "./create-post.dto";
import {PostType} from "@project/libs/shared/app/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'quote'
  })
  type: PostType.Quote;

  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote'
  })
  quote: string;

  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold'
  })
  quoteAuthor: string;
}
