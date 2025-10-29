import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'secret',
  })
  public password!: string;

  @ApiProperty({
    description: 'User new password',
    example: 'secret',
  })
  public newPassword!: string;
}
