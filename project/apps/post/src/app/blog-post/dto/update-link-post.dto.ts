import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { CreateLinkPostMessages } from './create-link-post.messages';

export class UpdateLinkPostDto {
  @ApiProperty({
    description: 'Link',
    example: 'google.com',
  })
  @IsOptional()
  @IsUrl({}, { message: CreateLinkPostMessages.link.invalidFormat })
  link?: string;

  @ApiProperty({
    description: 'Description to post',
    example: 'test description',
  })
  @IsOptional()
  @IsString({ message: CreateLinkPostMessages.description.invalidFormat })
  @MaxLength(300, { message: CreateLinkPostMessages.description.maxLength })
  description?: string;
}
