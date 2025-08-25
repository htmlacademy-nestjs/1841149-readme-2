import {PostState} from "@project/types";
import {ApiProperty} from "@nestjs/swagger";
import {PostType} from "@project/types";
import {ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsOptional, IsString, ValidateNested} from "class-validator";
import {CreatePostMessages} from "./create-post.messages";
import {Type} from "class-transformer";
import {CreateVideoPostDto} from "./create-video-post.dto";
import {CreateLinkPostDto} from "./create-link-post.dto";
import {CreateTextPostDto} from "./create-text-post.dto";
import {CreateQuotePostDto} from "./create-quote-post.dto";
import {CreatePhotoPostDto} from "./create-photo-post.dto";

export class CreatePostDto {
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
  @IsBoolean()
  repost?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateVideoPostDto)
  videoPost?: CreateVideoPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLinkPostDto)
  linkPost?: CreateLinkPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTextPostDto)
  textPost?: CreateTextPostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateQuotePostDto)
  quotePost?: CreateQuotePostDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePhotoPostDto)
  photoPost?: CreatePhotoPostDto;
}
