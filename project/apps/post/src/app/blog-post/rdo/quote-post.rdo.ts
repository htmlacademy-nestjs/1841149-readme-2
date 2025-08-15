import {BasePostRdo} from "./base-post.rdo";
import {PostType} from "@project/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class QuotePostRdo extends BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'photo'
  })
  type!: PostType.Quote;

  @Expose()
  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote'
  })
  quote!: string;

  @Expose()
  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold'
  })
  quoteAuthor!: string;
}
