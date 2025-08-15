import {BasePostRdo} from "./base-post.rdo";
import {PostType} from "@project/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LinkPostRdo extends BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'link'
  })
  type!: PostType.Link;

  @Expose()
  @ApiProperty({
    description: 'Link',
    example: 'google.com'
  })
  link!: string;

  @Expose()
  @ApiProperty({
    description: 'Description to post',
    example: 'test description'
  })
  description!: string;
}
