import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorRdo {
  @ApiProperty({
    description: 'Error status code',
    example: '401',
  })
  public status!: number;

  @ApiProperty({
    description: 'Error status message',
    example: 'Unauthorized',
  })
  public message!: string;
}
