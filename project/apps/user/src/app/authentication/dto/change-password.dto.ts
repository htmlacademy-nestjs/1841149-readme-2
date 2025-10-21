import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'secret',
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'User new password',
    example: 'secret',
  })
  @IsString()
  public newPassword!: string;
}
