import {BasePostRdo} from "./base-post.rdo";
import {PostType} from "@project/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class PhotoPostRdo extends BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'photo'
  })
  type!: PostType.Photo;

  @Expose()
  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg'
  })
  photo!: string;
}
