import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  public password!: string;
}
