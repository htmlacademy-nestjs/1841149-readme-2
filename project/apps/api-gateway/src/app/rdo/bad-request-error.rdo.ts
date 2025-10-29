import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorRdo {
  @ApiProperty({
    description: 'Error status code',
    example: '400',
  })
  public status!: number;

  @ApiProperty({
    description: 'Error status message',
    example: 'Bad Request',
  })
  public message!: string;
}
