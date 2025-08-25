import {PostState} from "@project/types";
import {Expose, Transform, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {VideoPostRdo} from "./video-post.rdo";
import {TextPostRdo} from "./text-post.rdo";
import {QuotePostRdo} from "./quote-post.rdo";
import {PhotoPostRdo} from "./photo-post.rdo";
import {LinkPostRdo} from "./link-post.rdo";
import {PostType} from "@prisma/client";
import {TagPostEntity} from "../../tag-post/tag-post.entity";

export class BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'photo'
  })
  public type!: PostType;

  @Expose()
  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]'
  })
  @Transform(({ value }) => value.map((tag: TagPostEntity) => tag.title))
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
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post update date',
    example: '2025-08-11T07:01:32.001Z'
  })
  public updatedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post author',
    example: '{ id: "123"}'
  })
  public author!: string;

  @Expose()
  @ApiProperty({
    description: 'Like count',
    example: '0'
  })
  public likeCount!: number;

  @Expose()
  @ApiProperty({
    description: 'Comment count',
    example: '0'
  })
  public commentCount!: number;

  @Expose()
  @Type(() => VideoPostRdo)
  videoPost?: VideoPostRdo;

  @Expose()
  @Type(() => TextPostRdo)
  textPost?: TextPostRdo;

  @Expose()
  @Type(() => QuotePostRdo)
  quotePost?: QuotePostRdo;

  @Expose()
  @Type(() => PhotoPostRdo)
  photoPost?: PhotoPostRdo;

  @Expose()
  @Type(() => LinkPostRdo)
  linkPost?: LinkPostRdo;
}
