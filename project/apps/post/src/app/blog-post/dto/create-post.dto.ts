import { PostState } from '@project/types';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/types';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreatePostMessages } from './create-post.messages';
import { CreateVideoPostMessages } from './create-video-post.messages';
import { CreateLinkPostMessages } from './create-link-post.messages';
import { CreateTextPostMessages } from './create-text-post.messages';
import { CreateQuotePostMessages } from './create-quote-post.messages';
import { CreatePhotoPostMessages } from './create-photo-post.messages';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]',
  })
  @IsOptional()
  @IsArray({ message: CreatePostMessages.tags.invalidFormat })
  @IsString({ each: true, message: CreatePostMessages.tags.invalidTagFormat })
  @ArrayMaxSize(10, { message: CreatePostMessages.tags.maxLength })
  tags?: string[];

  @ApiProperty({
    description: 'Post type',
    example: 'video',
  })
  @IsEnum(PostType, { message: CreatePostMessages.type.value })
  type!: PostType;

  @ApiProperty({
    description: 'Post status',
    example: 'draft or published',
  })
  @IsEnum(PostState, { message: CreatePostMessages.status.value })
  status!: PostState;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Repost flag',
    example: 'false',
  })
  repost?: boolean;

  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  @IsOptional()
  @IsString({ message: CreateVideoPostMessages.title.invalidFormat })
  @IsNotEmpty()
  @MinLength(10, { message: CreateVideoPostMessages.title.minLength })
  @MaxLength(50, { message: CreateVideoPostMessages.title.maxLength })
  title?: string;

  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video',
  })
  @IsOptional()
  @IsUrl({}, { message: CreateVideoPostMessages.videoLink.invalidFormat })
  videoLink?: string;

  @ApiProperty({
    description: 'Link',
    example: 'google.com',
  })
  @IsOptional()
  @IsUrl({}, { message: CreateLinkPostMessages.link.invalidFormat })
  link?: string;

  @ApiProperty({
    description: 'Description to post',
    example: 'test description',
  })
  @IsOptional()
  @IsString({ message: CreateLinkPostMessages.description.invalidFormat })
  @MaxLength(300, { message: CreateLinkPostMessages.description.maxLength })
  description?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description',
  })
  @IsOptional()
  @IsString({ message: CreateTextPostMessages.announce.invalidFormat })
  @MinLength(20, { message: CreateTextPostMessages.announce.minLength })
  @MaxLength(50, { message: CreateTextPostMessages.announce.maxLength })
  announce?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat',
  })
  @IsOptional()
  @IsString({ message: CreateTextPostMessages.text.invalidFormat })
  @MinLength(20, { message: CreateTextPostMessages.text.minLength })
  @MaxLength(50, { message: CreateTextPostMessages.text.maxLength })
  text?: string;

  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote',
  })
  @IsOptional()
  @IsString({ message: CreateQuotePostMessages.quote.invalidFormat })
  @MinLength(20, { message: CreateQuotePostMessages.quote.minLength })
  @MaxLength(300, { message: CreateQuotePostMessages.quote.maxLength })
  quote?: string;

  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold',
  })
  @IsOptional()
  @IsString({ message: CreateQuotePostMessages.quoteAuthor.invalidFormat })
  @MinLength(3, { message: CreateQuotePostMessages.quoteAuthor.minLength })
  @MaxLength(50, { message: CreateQuotePostMessages.quoteAuthor.maxLength })
  quoteAuthor?: string;

  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg',
  })
  @IsOptional()
  @IsUrl({}, { message: CreatePhotoPostMessages.photo.invalidFormat })
  photo?: string;

  @ApiProperty({})
  userId!: string;
}
