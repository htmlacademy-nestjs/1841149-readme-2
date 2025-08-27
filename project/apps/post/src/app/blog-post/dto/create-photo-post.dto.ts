import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { CreatePhotoPostMessages } from './create-photo-post.messages';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg',
  })
  @IsUrl({}, { message: CreatePhotoPostMessages.photo.invalidFormat })
  photo!: string;
}
