import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { CreateUserDto } from './dto/create-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import type { Request } from 'express';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class AuthentificationController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );

    return data;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      createUserDto
    );
    return data;
  }

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

  @UseGuards(CheckAuthGuard)
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
}
