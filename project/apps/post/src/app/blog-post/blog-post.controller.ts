import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateQuotePostDto} from "./dto/create-quote-post.dto";
import {CreateVideoPostDto} from "./dto/create-video-post.dto";
import {CreateTextPostDto} from "./dto/create-text-post.dto";
import {CreateLinkPostDto} from "./dto/create-link-post.dto";
import {CreatePhotoPostDto} from "./dto/create-photo-post.dto";
import {BlogPostService} from "./blog-post.service";
import {fillDto} from "@project/helpers";
import {BasePostRdo} from "./rdo/base-post.rdo";
import {ApiResponse} from "@nestjs/swagger";
import {UpdatePostDto} from "./dto/update-post.dto";
import {BlogPostQuery} from "./query/blog-post.query";
import {BlogPostWithPaginationRdo} from "./rdo/blog-post-with-pagination.rdo";

// TODO разграничить разные типа постов

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
  ) {}

  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toObject()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Detail post information',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.show(id);
    return fillDto(BasePostRdo, post.toObject());
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created post',
  })
  @Post('')
  public async create(@Body() dto: CreateQuotePostDto | CreateVideoPostDto | CreateTextPostDto | CreateLinkPostDto | CreatePhotoPostDto) {
    const newPost = await this.blogPostService.create(dto);
    return fillDto(BasePostRdo, newPost.toObject());
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Successfully update post',
  })
  @Patch(':postId')
  public async update(@Body() dto: UpdatePostDto, @Param('postId') postId: string) {
    const editedPost = await this.blogPostService.update({ ...dto, id: postId });
    return fillDto(BasePostRdo, editedPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully delete post',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.delete(id);
  }
  //
  //
  // @Get('search')
  // public async search(@Query('search') search: string) {
  //   //   TODO
  // }
}
