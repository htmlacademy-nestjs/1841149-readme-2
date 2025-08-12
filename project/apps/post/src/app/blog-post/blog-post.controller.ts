import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateQuotePostDto} from "./dto/create-quote-post.dto";
import {CreateVideoPostDto} from "./dto/create-video-post.dto";
import {CreateTextPostDto} from "./dto/create-text-post.dto";
import {CreateLinkPostDto} from "./dto/create-link-post.dto";
import {CreatePhotoPostDto} from "./dto/create-photo-post.dto";
import {BlogPostService} from "./blog-post.service";
import {fillDto} from "@project/libs/shared/helpers";
import {PostType} from "@project/libs/shared/app/types";
import {PhotoPostRdo} from "./rdo/photo-post.rdo";
import {LinkPostRdo} from "./rdo/link-post.rdo";
import {QuotePostRdo} from "./rdo/quote-post.rdo";
import {VideoPostRdo} from "./rdo/video-post.rdo";
import {TextPostRdo} from "./rdo/text-post.rdo";
import {UpdatePostDto} from "./dto/update-post.dto";
import {BasePostRdo} from "./rdo/base-post.rdo";
import {ApiResponse} from "@nestjs/swagger";
import {PostsRdo} from "./rdo/posts.rdo";

// TODO разграничить разные типа постов

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
  ) {}

  @Get('')
  public async get() {
    const posts = await this.blogPostService.index();

    // TODO добавить логику сортировки, пагинации, фильтрации

    return fillDto(PostsRdo, { entities: posts.map((post) => post.toObject()) });
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Detail post information',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.show(id);
    let result

    switch (post.type) {
      case PostType.Photo:
        result = fillDto(PhotoPostRdo, post.toObject());
        break;
      case PostType.Link:
        result = fillDto(LinkPostRdo, post.toObject());
        break;
      case PostType.Quote:
        result = fillDto(QuotePostRdo, post.toObject());
        break;
      case PostType.Video:
        result = fillDto(VideoPostRdo, post.toObject());
        break;
      case PostType.Text:
        result = fillDto(TextPostRdo, post.toObject());
        break;
    }

    return result;
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created post',
  })
  @Post('')
  public async create(@Body() dto: CreateQuotePostDto | CreateVideoPostDto | CreateTextPostDto | CreateLinkPostDto | CreatePhotoPostDto) {
    const newPost = await this.blogPostService.create(dto);
    let result

    switch (newPost.type) {
      case PostType.Photo:
        result = fillDto(PhotoPostRdo, newPost.toObject());
        break;
      case PostType.Link:
        result = fillDto(LinkPostRdo, newPost.toObject());
        break;
      case PostType.Quote:
        result = fillDto(QuotePostRdo, newPost.toObject());
        break;
      case PostType.Video:
        result = fillDto(VideoPostRdo, newPost.toObject());
        break;
      case PostType.Text:
        result = fillDto(TextPostRdo, newPost.toObject());
        break;
    }

    return result;
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Successfully update post',
  })
  @Patch(':postId')
  public async update(@Body() dto: UpdatePostDto, @Param('postId') postId: string) {
    const editedPost = await this.blogPostService.update({ ...dto, id: postId });
    let result

    switch (editedPost.type) {
      case PostType.Photo:
        result = fillDto(PhotoPostRdo, editedPost.toObject());
        break;
      case PostType.Link:
        result = fillDto(LinkPostRdo, editedPost.toObject());
        break;
      case PostType.Quote:
        result = fillDto(QuotePostRdo, editedPost.toObject());
        break;
      case PostType.Video:
        result = fillDto(VideoPostRdo, editedPost.toObject());
        break;
      case PostType.Text:
        result = fillDto(TextPostRdo, editedPost.toObject());
        break;
    }

    return result;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully delete post',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.delete(id);
  }

  @Post(':id/image')
  public async uploadImage() {
    //   TODO
  }

  @Get('search')
  public async search(@Query('search') search: string) {
    //   TODO
  }
}
