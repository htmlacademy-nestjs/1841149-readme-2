import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {BlogUserRepository} from "../blog-user/blog-user.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import {
  AUTH_MESSAGES,
} from "./authentication.constant";
import {BlogUserEntity} from "../blog-user/blog-user.entity";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
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
    }

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
      throw new NotFoundException(AUTH_MESSAGES.AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
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
}
