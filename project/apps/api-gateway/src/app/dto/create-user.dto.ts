import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  @IsEmail({})
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  public firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  public lastName!: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'avatar url',
    example: 'test.png',
  })
  public avatarUrl?: string;
}
