import {CreatePostDto} from "./create-post.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsUrl, MaxLength, MinLength} from "class-validator";
import {CreateVideoPostMessages} from "./create-video-post.messages";

export class CreateVideoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Title'
  })
  @IsString({ message: CreateVideoPostMessages.title.invalidFormat })
  @IsNotEmpty()
  @MinLength(10, { message: CreateVideoPostMessages.title.minLength })
  @MaxLength(50, { message: CreateVideoPostMessages.title.maxLength })
  title!: string;

  @ApiProperty({
    description: 'Post link to video',
    example: 'youtube.com/video'
  })
  @IsUrl({}, { message: CreateVideoPostMessages.videoLink.invalidFormat })
  videoLink!: string;
}
