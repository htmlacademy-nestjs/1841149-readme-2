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
import type {
  RequestWithTokenPayload,
  RequestWithUserId,
} from '@project/types';
import { BadRequestErrorRdo } from './rdo/bad-request-error.rdo';
import { UnauthorizedErrorRdo } from './rdo/unathorized-error.rdo';
import { InternalErrorRdo } from './rdo/internal-error.rdo';

@Controller('subscribe')
@UseFilters(AxiosExceptionFilter)
export class SubscribeController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: CreateSubscriptionDto,
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created.',
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
  @Post(':id')
  public async create(
    @Req() req: RequestWithTokenPayload,
    @Param('id') id: string
  ) {
    const headers = {
      'X-UserId': req.user?.sub,
      Authorization: req.headers['authorization'],
    };

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Subscribe}/${id}`,
      null,
      { headers }
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully unsubscribe',
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
