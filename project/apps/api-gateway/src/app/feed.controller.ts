import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HeaderUserIdInterceptor } from './interceptors/header-user-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { BlogPostQuery } from './query/blog-post.query';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BadRequestErrorRdo } from './rdo/bad-request-error.rdo';
import { UnauthorizedErrorRdo } from './rdo/unathorized-error.rdo';
import { InternalErrorRdo } from './rdo/internal-error.rdo';
import { PostsWithPaginationRdo } from './rdo/posts-with-pagination.rdo';
import { BasePostRdo } from './rdo/base-post.rdo';
import type { RequestWithTokenPayload } from '@project/types';

@Controller('feed')
@UseFilters(AxiosExceptionFilter)
export class FeedController {
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
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Get('')
  public async index(
    @Req() req: RequestWithTokenPayload,
    @Query() query: BlogPostQuery
  ) {
    const headers = {
      'X-UserId': req.user?.sub,
      Authorization: req.headers['authorization'],
    };

    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Subscribe}`,
      { headers }
    );

    query.authorId = [...data.entities, req.user?.sub];

    const feed = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/feed`,
      {
        params: query,
        headers,
      }
    );

    const processedEntities = await Promise.all(
      feed.data.entities.map(async (el: BasePostRdo) => {
        const { data: userData } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Users}/${el.authorId}/post`,
          {
            headers,
          }
        );

        return {
          ...el,
          author: userData,
        };
      })
    );

    return {
      ...feed.data,
      entities: processedEntities,
    };
  }
}
