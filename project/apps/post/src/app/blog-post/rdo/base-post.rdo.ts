import { PostState } from '@project/types';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { TagPostEntity } from '../../tag-post/tag-post.entity';

export class BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'photo',
  })
  public type!: PostType;

  @Expose()
  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]',
  })
  @Transform(({ value }) => value.map((tag: TagPostEntity) => tag.title))
  public tags!: string[];

  @Expose()
  @ApiProperty({
    description: 'Post status',
    example: 'draft',
  })
  public status!: PostState;

  @Expose()
  @ApiProperty({
    description: 'Post publish date',
    example: '2025-08-11T07:01:32.001Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post update date',
    example: '2025-08-11T07:01:32.001Z',
  })
  public updatedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post author',
    example: '123',
  })
  public authorId!: string;

  @Expose()
  @ApiProperty({
    description: 'Like count',
    example: '0',
  })
  public likeCount!: number;

  @Expose()
  @ApiProperty({
    description: 'Comment count',
    example: '0',
  })
  public commentCount!: number;

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  public title?: string;

  @Expose()
  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video',
  })
  public videoLink?: string;

  @Expose()
  @ApiProperty({
    description: 'Post announcement',
    example: 'Short description',
  })
  public announce?: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'I have a cat',
  })
  public text?: string;

  @Expose()
  @ApiProperty({
    description: 'Post quote text',
    example: 'text of quote',
  })
  public quote?: string;

  @Expose()
  @ApiProperty({
    description: 'Post quote author',
    example: 'Arnold',
  })
  public quoteAuthor?: string;

  @Expose()
  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg',
  })
  public photo?: string;

  @Expose()
  @ApiProperty({
    description: 'Link',
    example: 'google.com',
  })
  public link?: string;

  @Expose()
  @ApiProperty({
    description: 'Description to post',
    example: 'test description',
  })
  public description?: string;
}
