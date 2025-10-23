import { ApiProperty } from '@nestjs/swagger';

export class GetUserRdo {
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  public id!: string;

  @ApiProperty({
    description: 'Registration user date',
    example: '2025-08-15T09:27:50.564Z',
  })
  public registrationDate!: string;

  @ApiProperty({
    description: 'User post count',
    example: '1',
  })
  public postCount!: number;

  @ApiProperty({
    description: 'User subscribers count',
    example: '1',
  })
  public subscriberCount!: number;
}
