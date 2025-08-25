import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class VideoPostRdo {
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
