import {CreatePostDto} from "./create-post.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength, MinLength} from "class-validator";
import {CreateQuotePostMessages} from "./create-quote-post.messages";

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote'
  })
  @IsString({ message: CreateQuotePostMessages.quote.invalidFormat })
  @MinLength(20, { message: CreateQuotePostMessages.quote.minLength })
  @MaxLength(300, { message: CreateQuotePostMessages.quote.maxLength })
  quote!: string;

  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold'
  })
  @IsString({ message: CreateQuotePostMessages.quoteAuthor.invalidFormat })
  @MinLength(3, { message: CreateQuotePostMessages.quoteAuthor.minLength })
  @MaxLength(50, { message: CreateQuotePostMessages.quoteAuthor.maxLength })
  quoteAuthor!: string;
}
