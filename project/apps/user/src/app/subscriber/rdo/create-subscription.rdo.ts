import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionRdo {
  @Expose()
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  public userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Subscribed user id',
    example: '123',
  })
  public subscriberId!: string;
}
