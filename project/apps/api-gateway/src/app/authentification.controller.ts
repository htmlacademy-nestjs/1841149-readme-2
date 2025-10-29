import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { CreateUserDto } from './dto/create-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import type { Request } from 'express';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HeaderUserIdInterceptor } from './interceptors/header-user-id.interceptor';
import type { RequestWithUserId } from '@project/types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UnauthorizedErrorRdo } from './rdo/unathorized-error.rdo';
import { BadRequestErrorRdo } from './rdo/bad-request-error.rdo';
import { ConflictErrorRdo } from './rdo/conflict-error.rdo';
import { InternalErrorRdo } from './rdo/internal-error.rdo';
import { GetUserRdo } from './rdo/get-user.rdo';
import { RefreshedTokenRDO } from './rdo/refresh-token.rdo';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class AuthentificationController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
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
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: ConflictErrorRdo,
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      createUserDto
    );
    return data;
  }

  @ApiResponse({
    type: RefreshedTokenRDO,
    status: HttpStatus.OK,
    description: 'New JWT token pair',
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
  @Get('refresh')
  public async refreshTokens(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/refresh`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
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
  @Post('change-password')
  public async changePassword(
    @Req() req: RequestWithUserId,
    @Body() dto: ChangePasswordDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/password`,
      dto,
      {
        headers: {
          'X-UserId': req.userId,
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: GetUserRdo,
    status: HttpStatus.OK,
    description: 'User information',
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
  @Get(':id')
  public async show(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }
}
