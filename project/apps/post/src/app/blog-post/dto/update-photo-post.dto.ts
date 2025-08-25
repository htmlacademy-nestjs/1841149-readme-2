import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsUrl} from "class-validator";
import {CreatePhotoPostMessages} from "./create-photo-post.messages";

export class UpdatePhotoPostDto {
  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg'
  })
  @IsOptional()
  @IsUrl({}, { message: CreatePhotoPostMessages.photo.invalidFormat })
  photo?: string;
}
