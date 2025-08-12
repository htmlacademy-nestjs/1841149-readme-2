import {CreatePostDto} from "./create-post.dto";
import {PostType} from "@project/libs/shared/app/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreateVideoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  type: PostType.Video;

  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  title: string;

  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video'
  })
  videoLink: string;
}
