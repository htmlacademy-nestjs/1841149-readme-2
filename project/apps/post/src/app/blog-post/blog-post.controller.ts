import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { fillDto } from '@project/helpers';
import { BasePostRdo } from './rdo/base-post.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { BlogPostTypeQuery } from './query/blog-post-type.query';
import { PostType } from '@project/types';
import { BlogPostSearchQuery } from './query/blog-post-search.query';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of posts',
    type: BlogPostWithPaginationRdo,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toObject()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of searched post by title',
    type: BlogPostWithPaginationRdo,
  })
  @Get('/search')
  public async search(@Query() query: BlogPostSearchQuery) {
    const postsWithPagination = await this.blogPostService.searchByTitle(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toObject()),
    };

    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of posts by chose type',
    type: BlogPostWithPaginationRdo,
  })
  @Get('/type/:type')
  public async categorize(
    @Query() query: BlogPostTypeQuery,
    @Param('type') type: PostType
  ) {
    const postsWithPagination = await this.blogPostService.getPostByType(
      query,
      type
    );
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toObject()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.CREATED,
    description: 'Successfully created post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Post('')
  public async create(
    @Body()
    dto: CreatePostDto
  ) {
    const newPost = await this.blogPostService.create(dto);
    return fillDto(BasePostRdo, newPost.toObject());
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Successfully update post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'You are trying to update not your post.',
  })
  @Patch(':postId')
  public async update(
    @Body() dto: UpdatePostDto,
    @Param('postId') postId: string
  ) {
    const editedPost = await this.blogPostService.update({
      ...dto,
      id: postId,
    });
    return fillDto(BasePostRdo, editedPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully delete post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'You are trying to delete not your post.',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.delete(id);
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.CREATED,
    description: 'Repost post',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Get(':id/repost')
  public async repost(@Param('id') id: string) {
    const post = await this.blogPostService.repost(id, '444');
    return fillDto(BasePostRdo, post.toObject());
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Detail post information',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.show(id);
    return fillDto(BasePostRdo, post.toObject());
  }
}
