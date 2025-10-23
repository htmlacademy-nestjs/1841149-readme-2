import { ApiProperty } from '@nestjs/swagger';

export class ConflictErrorRdo {
  @ApiProperty({
    description: 'Error status code',
    example: '409',
  })
  public status!: number;

  @ApiProperty({
    description: 'Error status message',
    example: 'Conflict',
  })
  public message!: string;
}
