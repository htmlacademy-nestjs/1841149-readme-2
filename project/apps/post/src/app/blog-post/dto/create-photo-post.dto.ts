import {CreatePostDto} from "./create-post.dto";
import {PostType} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'link'
  })
  type!: PostType.Photo;

  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg'
  })
  photo!: string;
}
