import { ApiProperty } from '@nestjs/swagger';

export class RefreshedTokenRDO {
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
