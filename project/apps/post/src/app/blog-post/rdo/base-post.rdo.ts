import {PostState} from "@project/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]'
  })
  public tags!: string[];

  @Expose()
  @ApiProperty({
    description: 'Post status',
    example: 'draft'
  })
  public status!: PostState;

  @Expose()
  @ApiProperty({
    description: 'Post publish date',
    example: '2025-08-11T07:01:32.001Z'
  })
  public publishAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Post update date',
    example: '2025-08-11T07:01:32.001Z'
  })
  public updatedAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Post author',
    example: '{ id: "123"}'
  })
  public author!: string;
}
