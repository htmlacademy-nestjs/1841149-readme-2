import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  @IsEmail({})
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  @IsString()
  public password!: string;
}
