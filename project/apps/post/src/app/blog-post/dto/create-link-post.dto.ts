import {CreatePostDto} from "./create-post.dto";
import {PostType} from "@project/libs/shared/app/types";
import {ApiProperty} from "@nestjs/swagger";

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'link'
  })
  type: PostType.Link;

  @ApiProperty({
    description: 'Link',
    example: 'google.com'
  })
  link: string;

  @ApiProperty({
    description: 'Description to post',
    example: 'test description'
  })
  description: string;
}
