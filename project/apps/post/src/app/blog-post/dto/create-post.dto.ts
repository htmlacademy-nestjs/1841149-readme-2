import {PostState} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]'
  })
  tags!: string[];

  @ApiProperty({
    description: 'Post status',
    example: 'draft'
  })
  status!: PostState;

  @ApiProperty({
    description: 'Post publish date',
    example: '2025-08-11T07:01:32.001Z'
  })
  publishAt!: string;

  @ApiProperty({
    description: 'Post update date',
    example: '2025-08-11T07:01:32.001Z'
  })
  updatedAt!: string;

  @ApiProperty({
    description: 'Repost boolean',
    example: 'false'
  })
  repost!: boolean;

  @ApiProperty({
    description: 'Repost author',
    example: 'false'
  })
  repostAuthor!: string;

  @ApiProperty({
    description: 'Post author',
    example: 'false'
  })
  author!: string;
}
