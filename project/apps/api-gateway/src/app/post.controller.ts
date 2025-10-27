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
import {
  PostType,
  type RequestWithTokenPayload,
  type RequestWithUserId,
} from '@project/types';
import { UpdatePostDto } from './dto/update-post.dto';
import { HeaderUserIdInterceptor } from './interceptors/header-user-id.interceptor';
import { ApiResponse } from '@nestjs/swagger';
import { PostsWithPaginationRdo } from './rdo/posts-with-pagination.rdo';
import { BadRequestErrorRdo } from './rdo/bad-request-error.rdo';
import { InternalErrorRdo } from './rdo/internal-error.rdo';
import { UnauthorizedErrorRdo } from './rdo/unathorized-error.rdo';
import { BasePostRdo } from './rdo/base-post.rdo';
import { BasePostWithAuthorRdo } from './rdo/base-post-with-author.rdo';
import { CreateCommentRdo } from './rdo/created-comment.rdo';
import { CommentsWithPaginationRdo } from './rdo/comments-with-pagination.rdo';
import { LikePostRdo } from './rdo/like-post.rdo';
import { DetailPostRdo } from './rdo/detail-post.rdo';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostsController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: PostsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Posts with pagination',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Get('')
  public async index(@Query() query: BlogPostQuery) {
    const posts = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/`,
      {
        params: query,
      }
    );

    const processedEntities = await Promise.all(
      posts.data.entities.map(async (el: BasePostRdo) => {
        const { data: userData } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Users}/${el.authorId}/post`
        );

        return {
          ...el,
          author: userData,
        };
      })
    );

    return {
      ...posts.data,
      entities: processedEntities,
    };
  }

  @ApiResponse({
    type: PostsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Posts search by title with pagination',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Get('search')
  public async search(@Query() query: BlogPostSearchQuery) {
    const posts = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/search`,
      {
        params: query,
      }
    );

    const processedEntities = await Promise.all(
      posts.data.entities.map(async (el: BasePostRdo) => {
        const { data: userData } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Users}/${el.authorId}/post`
        );

        return {
          ...el,
          author: userData,
        };
      })
    );

    return {
      ...posts.data,
      entities: processedEntities,
    };
  }

  @ApiResponse({
    type: PostsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Posts by type with pagination',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Get('type/:type')
  public async categorized(
    @Query() query: BlogPostTypeQuery,
    @Param('type') type: PostType
  ) {
    const posts = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/type/${type}`,
      {
        params: query,
      }
    );

    const processedEntities = await Promise.all(
      posts.data.entities.map(async (el: BasePostRdo) => {
        const { data: userData } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Users}/${el.authorId}/post`
        );

        return {
          ...el,
          author: userData,
        };
      })
    );

    return {
      ...posts.data,
      entities: processedEntities,
    };
  }

  @ApiResponse({
    type: CommentsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Get comments for post',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Get(':postId/comments')
  public async getComments(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}/comments`
    );

    return data;
  }

  @ApiResponse({
    type: DetailPostRdo,
    status: HttpStatus.OK,
    description: 'Get post by id',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Get(':postId')
  public async get(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}`
    );

    return data;
  }

  @ApiResponse({
    type: BasePostWithAuthorRdo,
    status: HttpStatus.OK,
    description: 'Created post data',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('')
  public async create(
    @Body() dto: CreatePostDto,
    @Req() request: RequestWithTokenPayload
  ) {
    const post = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/`,
      dto,
      {
        headers: {
          'X-User': JSON.stringify(request.user),
        },
      }
    );

    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${post.data.authorId}/post`
    );

    delete post.data.authorId;

    return {
      ...post.data,
      author: userData,
    };
  }

  @ApiResponse({
    type: LikePostRdo,
    status: HttpStatus.OK,
    description: 'Like added',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Post(':postId/likes')
  public async like(
    @Param('postId') postId: string,
    @Req() req: RequestWithUserId
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/likes`,
      null,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: BasePostRdo,
    status: HttpStatus.OK,
    description: 'Repost created',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Post(':postId/repost')
  public async repost(
    @Param('postId') postId: string,
    @Req() req: RequestWithUserId
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/repost`,
      null,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: CreateCommentRdo,
    status: HttpStatus.OK,
    description: 'Comment created',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
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

  @ApiResponse({
    type: BasePostWithAuthorRdo,
    status: HttpStatus.OK,
    description: 'Updated post data',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Patch(':postId')
  public async update(
    @Body() dto: UpdatePostDto,
    @Param('postId') postId: string
  ) {
    const post = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Posts}/${postId}`,
      dto
    );

    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${post.data.authorId}/post`
    );

    delete post.data.authorId;

    return {
      ...post.data,
      author: userData,
    };
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
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

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like removed',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
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

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully deleted post',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Delete(':postId')
  public async delete(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Posts}/${postId}`
    );

    return data;
  }
}
