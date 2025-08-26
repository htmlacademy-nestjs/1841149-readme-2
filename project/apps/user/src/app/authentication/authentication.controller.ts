import {Body, Controller, Get, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { fillDto } from "@project/helpers";
import { UserRdo } from "./rdo/user.rdo";
import { LoginUserDto } from "./dto/login-user.dto";
import { DetailUserRdo } from "./rdo/detail-user.rdo";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { MongoIdValidationPipe } from "@project/core";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {LoggedUserRdo} from "./rdo/logged-user.rdo";

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
    const verifiedUser = await this.authService.verifyUser(dto)
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDto(LoggedUserRdo, { ...verifiedUser.toObject(), ...userToken });
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
