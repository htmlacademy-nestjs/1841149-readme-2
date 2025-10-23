import { ApiProperty } from '@nestjs/swagger';

export class InternalErrorRdo {
  @ApiProperty({
    description: 'Error status code',
    example: '500',
  })
  public status!: number;

  @ApiProperty({
    description: 'Error status message',
    example: 'Server internal error',
  })
  public message!: string;
}
