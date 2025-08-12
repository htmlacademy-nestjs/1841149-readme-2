import {PostType} from "@project/libs/shared/app/types";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post id',
    example: '11'
  })
  id: string;

  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]'
  })
  tags?: string[];

  @ApiProperty({
    description: 'Post publish date',
    example: '2025-08-11T07:01:32.001Z'
  })
  publishAt?: string;

  @ApiProperty({
    description: 'Link',
    example: 'google.com'
  })
  link?: string;

  @ApiProperty({
    description: 'Description to post',
    example: 'test description'
  })
  description?: string;

  @ApiProperty({
    description: 'Post type',
    example: 'link'
  })
  type?: PostType;

  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg'
  })
  photo?: string;

  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote'
  })
  quote?: string;

  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold'
  })
  quoteAuthor?: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  title?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description'
  })
  announce?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat'
  })
  text?: string;

  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video'
  })
  videoLink?: string;
}
