import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {CreateTextPostMessages} from "./create-text-post.messages";

export class UpdateTextPostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  @IsOptional()
  @IsString({ message: CreateTextPostMessages.title.invalidFormat })
  @MinLength(20, { message: CreateTextPostMessages.title.minLength })
  @MaxLength(50, { message: CreateTextPostMessages.title.maxLength })
  title?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description'
  })
  @IsOptional()
  @IsString({ message: CreateTextPostMessages.announce.invalidFormat })
  @MinLength(20, { message: CreateTextPostMessages.announce.minLength })
  @MaxLength(50, { message: CreateTextPostMessages.announce.maxLength })
  announce?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat'
  })
  @IsOptional()
  @IsString({ message: CreateTextPostMessages.text.invalidFormat })
  @MinLength(20, { message: CreateTextPostMessages.text.minLength })
  @MaxLength(50, { message: CreateTextPostMessages.text.maxLength })
  text?: string;
}
