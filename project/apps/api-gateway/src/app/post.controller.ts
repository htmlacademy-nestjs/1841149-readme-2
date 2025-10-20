import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UserIdInterceptor } from './interceptors/userId.interceptor';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { BlogPostQuery } from './query/blog-post.query';
import { BlogPostSearchQuery } from './query/blog-post-search.query';
import { BlogPostTypeQuery } from './query/blog-post-type.query';
import { PostType, type RequestWithUserId } from '@project/types';
import { UpdatePostDto } from './dto/update-post.dto';
import { HeaderUserIdInterceptor } from './interceptors/header-user-id.interceptor';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostsController {
  constructor(private readonly httpService: HttpService) {}

  @Get('')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/`,
      {
        params: query,
      }
    );

    return data;
  }

  @Get('search')
  public async search(@Query() query: BlogPostSearchQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/search`,
      {
        params: query,
      }
    );

    return data;
  }

  @Get('/type/:type')
  public async categorized(
    @Query() query: BlogPostTypeQuery,
    @Param('type') type: PostType
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/type/${type}`,
      {
        params: query,
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/`,
      dto
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Patch(':postId')
  public async update(
    @Body() dto: UpdatePostDto,
    @Param('postId') postId: string
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Posts}/${postId}`,
      dto
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Delete(':postId')
  public async delete(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Posts}/${postId}`
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Get(':postId/repost')
  public async repost(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}/repost`
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Get(':postId/likes')
  public async like(
    @Param('postId') postId: string,
    @Req() req: RequestWithUserId
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}/likes`,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Delete(':postId/likes')
  public async dislike(
    @Param('postId') postId: string,
    @Req() req: RequestWithUserId
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Posts}/${postId}/likes`,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get(':postId/comments')
  public async getComments(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}/comments`
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(':postId/comments')
  public async createComment(
    @Param('postId') postId: string,
    @Body() body: CreatePostDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      body
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Delete(':postId/comments/:commentId')
  public async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Req() req: RequestWithUserId
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Posts}/${postId}/comments/${commentId}`,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @Get(':postId')
  public async get(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}`
    );

    return data;
  }
}
