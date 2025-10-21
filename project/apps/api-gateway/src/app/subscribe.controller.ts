import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HeaderUserIdInterceptor } from './interceptors/header-user-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { HttpService } from '@nestjs/axios';
import { ApiResponse } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './dto/create-subsctiption.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import type { RequestWithUserId } from '@project/types';

@Controller('subscribe')
@UseFilters(AxiosExceptionFilter)
export class SubscribeController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: CreateSubscriptionDto,
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created.',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Post(':id')
  public async create(@Req() req: RequestWithUserId, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Subscribe}/${id}`,
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
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully unsubscribe',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(HeaderUserIdInterceptor)
  @Delete(':userId')
  public async delete(
    @Req() req: RequestWithUserId,
    @Param('userId') userId: string
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Subscribe}/${userId}`,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }
}
