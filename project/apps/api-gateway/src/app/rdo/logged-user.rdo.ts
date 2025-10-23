import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRDO {
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  public id!: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  public email!: string;

  @ApiProperty({
    description: 'User access token',
    example: 't123123.123123.123123',
  })
  public accessToken!: string;

  @ApiProperty({
    description: 'User refresh token',
    example: 't123123.123123.123123',
  })
  public refreshToken!: string;
}
