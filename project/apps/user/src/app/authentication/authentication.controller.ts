import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { fillDto } from "@project/libs/shared/helpers";
import { UserRdo } from "./rdo/user.rdo";
import { LoginUserDto } from "./dto/login-user.dto";
import { DetailUserRdo } from "./rdo/detail-user.rdo";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toObject());
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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifyUser = await this.authService.verifyUser(dto)
    return fillDto(UserRdo, verifyUser.toObject());
  }

  @ApiResponse({
    type: DetailUserRdo,
    status: HttpStatus.OK,
    description: 'Detail user information',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(DetailUserRdo, existUser.toObject());
  }
}
