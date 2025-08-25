import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class QuotePostRdo {
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
