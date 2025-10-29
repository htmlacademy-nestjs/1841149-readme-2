import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  public userId!: string;

  @ApiProperty({
    description: 'USubscriber user id',
    example: '124',
  })
  public subscriberId!: string;
}
