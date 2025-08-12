import {Controller, Get, Query} from "@nestjs/common";
import {FeedUserService} from "./feed-user.service";
import { SortType } from "@project/libs/shared/app/types";
import { fillDto } from "@project/libs/shared/helpers";
import {FeedPostRdo} from "./rdo/feed-post.rdo";

@Controller('feed')
export class FeedUserController {
  constructor(private readonly feedUserService: FeedUserService) {}

  @Get('')
  public async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '25',
    @Query('sort') sort = 'publishedAt',
    @Query('sortType') sortType = SortType.DESC,
  ) {
    // TODO получить id пользователя

    const feedOptions = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      sortType: sortType,
      userId: '123'
    };

    const feed = await this.feedUserService.getAll(feedOptions);

    return fillDto(FeedPostRdo, feed);
  }
}
