import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";
import {AUTH_VALIDATION_MESSAGES} from "../authentication.constant";

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com'
  })
  @IsEmail({}, { message: AUTH_VALIDATION_MESSAGES.NOT_VALID_EMAIL })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret'
  })
  @IsString()
  public password!: string;
}
