import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AUTH_VALIDATION_MESSAGES } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  @IsEmail({}, { message: AUTH_VALIDATION_MESSAGES.email.invalidFormat })
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString({ message: AUTH_VALIDATION_MESSAGES.firstName.invalidFormat })
  @MinLength(3, { message: AUTH_VALIDATION_MESSAGES.firstName.minLength })
  @MaxLength(50, { message: AUTH_VALIDATION_MESSAGES.firstName.maxLength })
  public firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString({ message: AUTH_VALIDATION_MESSAGES.lastName.invalidFormat })
  @MinLength(3, { message: AUTH_VALIDATION_MESSAGES.lastName.minLength })
  @MaxLength(50, { message: AUTH_VALIDATION_MESSAGES.lastName.maxLength })
  public lastName!: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  @IsString({ message: AUTH_VALIDATION_MESSAGES.password.invalidFormat })
  @MinLength(6, { message: AUTH_VALIDATION_MESSAGES.password.minLength })
  @MaxLength(12, { message: AUTH_VALIDATION_MESSAGES.password.maxLength })
  public password!: string;

  @ApiProperty({
    description: 'avatar url',
    example: 'test.png',
  })
  @IsOptional()
  public avatarUrl?: string;
}
