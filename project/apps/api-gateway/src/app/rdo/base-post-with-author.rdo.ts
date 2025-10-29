import { PostState } from '@project/types';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';

export class BasePostWithAuthorRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  public id!: string;

  @ApiProperty({
    description: 'Post type',
    example: 'photo',
  })
  public type!: PostType;

  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]',
  })
  public tags!: string[];

  @ApiProperty({
    description: 'Post status',
    example: 'draft',
  })
  public status!: PostState;

  @ApiProperty({
    description: 'Post publish date',
    example: '2025-08-11T07:01:32.001Z',
  })
  public createdAt!: Date;

  @ApiProperty({
    description: 'Post update date',
    example: '2025-08-11T07:01:32.001Z',
  })
  public updatedAt!: Date;

  @ApiProperty({
    description: 'Post author',
    example: '123',
  })
  public author!: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  @ApiProperty({
    description: 'Like count',
    example: '0',
  })
  public likeCount!: number;

  @ApiProperty({
    description: 'Comment count',
    example: '0',
  })
  public commentCount!: number;

  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  public title?: string;

  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video',
  })
  public videoLink?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description',
  })
  public announce?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat',
  })
  public text?: string;

  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote',
  })
  public quote?: string;

  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold',
  })
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg',
  })
  public photo?: string;

  @ApiProperty({
    description: 'Link',
    example: 'google.com',
  })
  public link?: string;

  @ApiProperty({
    description: 'Description to post',
    example: 'test description',
  })
  public description?: string;
}
