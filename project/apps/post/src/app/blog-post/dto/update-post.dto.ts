import {PostType} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";
import {ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, ValidateNested} from "class-validator";
import {CreatePostMessages} from "./create-post.messages";
import {PostState} from "@project/types";
import {Type} from "class-transformer";
import {UpdateVideoPostDto} from "./update-video-post.dto";
import {UpdateLinkPostDto} from "./update-link-post.dto";
import {UpdateTextPostDto} from "./update-text-post.dto";
import {UpdateQuotePostDto} from "./update-quote-post.dto";
import {UpdatePhotoPostDto} from "./update-photo-post.dto";

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post id',
    example: '11'
  })
  id!: string;

  @ApiProperty({
    description: 'Post tags array',
    example: '["photo", "celebrity"]'
  })
  @IsOptional()
  @IsArray({ message: CreatePostMessages.tags.invalidFormat })
  @IsString({ each: true, message: CreatePostMessages.tags.invalidTagFormat })
  @ArrayMaxSize(10, { message: CreatePostMessages.tags.maxLength })
  tags?: string[];

  @ApiProperty({
    description: 'Post type',
    example: '["photo", "celebrity"]'
  })
  @IsEnum(PostType, { message: CreatePostMessages.type.value })
  type!: PostType

  @ApiProperty({
    description: 'Post status',
    example: 'draft'
  })
  @IsEnum(PostState, { message: CreatePostMessages.status.value })
  status!: PostState;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVideoPostDto)
  videoPost?: UpdateVideoPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLinkPostDto)
  linkPost?: UpdateLinkPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateTextPostDto)
  textPost?: UpdateTextPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateQuotePostDto)
  quotePost?: UpdateQuotePostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePhotoPostDto)
  photoPost?: UpdatePhotoPostDto;
}
