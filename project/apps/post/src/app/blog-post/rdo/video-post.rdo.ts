import {BasePostRdo} from "./base-post.rdo";
import {PostType} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class VideoPostRdo extends BasePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  type!: PostType.Video;

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  title!: string;

  @Expose()
  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video'
  })
  videoLink!: string;
}
