import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { DetailUserRdo } from './rdo/detail-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { NotifyService } from '../notification/notification.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import type { RequestWithTokenPayload } from '@project/types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PostAuthorRdo } from './rdo/post-author.rdo';

interface RequestWithUser {
  user?: BlogUserEntity;
}

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notificationService: NotifyService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    const { email, firstName, lastName } = newUser;
    await this.notificationService.registerSubscriber({
      email,
      firstname: firstName,
      lastname: lastName,
    });
  }

  @ApiResponse({
    type: LoginUserDto,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toObject(), ...userToken });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refresh(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Headers('X-UserId') userId: string
  ) {
    await this.authService.updatePassword(userId, dto);
  }

  @ApiResponse({
    type: PostAuthorRdo,
    status: HttpStatus.OK,
    description: 'Detail user information',
  })
  @Get(':id/post')
  public async getPostAuthorInfo(
    @Param('id', MongoIdValidationPipe) id: string
  ) {
    const existUser = await this.authService.getUser(id);

    return fillDto(PostAuthorRdo, existUser.toObject());
  }

  @ApiResponse({
    type: DetailUserRdo,
    status: HttpStatus.OK,
    description: 'Detail user information',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(DetailUserRdo, existUser.toObject());
  }
}
