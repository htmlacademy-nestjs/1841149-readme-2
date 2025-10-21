import {
  Controller,
  Get,
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
import type { RequestWithUserId } from '@project/types';
import { BlogPostQuery } from './query/blog-post.query';

@Controller('feed')
@UseFilters(AxiosExceptionFilter)
export class FeedController {
  constructor(private readonly httpService: HttpService) {}

  @Get('')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  public async index(
    @Req() req: RequestWithUserId,
    @Query() query: BlogPostQuery
  ) {
    const headers = { 'X-UserId': req.userId };

    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Subscribe}`,
      { headers }
    );

    query.authorId = [...data.entities, req.userId];

    const feed = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/feed`,
      {
        params: query,
        headers,
      }
    );

    return feed.data;
  }
}
