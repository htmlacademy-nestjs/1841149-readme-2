import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_MESSAGES } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, Token } from '@project/types';
import { jwtConfig } from '@project/config-user';
import type { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/helpers';
import { randomUUID } from 'node:crypto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, firstName, lastName, password, avatarUrl } = dto;

    const blogUser = {
      email,
      firstName,
      lastName,
      password,
      avatarUrl: avatarUrl ? avatarUrl : '',
      passwordHash: '',
      registrationDate: new Date().toISOString(),
      postCount: 0,
      subscriberCount: 0,
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_MESSAGES.AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_MESSAGES.AUTH_USER_PASSWORD_WRONG);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_MESSAGES.AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_MESSAGES.AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
      return { accessToken, refreshToken };
      //   TODO подумать как исправить any
    } catch (error: any) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async updatePassword(userId: string, dto: ChangePasswordDto) {
    const { password, newPassword } = dto;
    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_MESSAGES.AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new BadRequestException(AUTH_MESSAGES.AUTH_USER_PASSWORD_WRONG);
    }

    await existUser.setPassword(newPassword);

    await this.blogUserRepository.update(userId, existUser);

    return existUser;
  }
}
