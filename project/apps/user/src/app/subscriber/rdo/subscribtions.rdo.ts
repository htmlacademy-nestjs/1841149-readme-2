import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Subscriber } from '@project/types';

export class SubscribersRdo {
  @Expose()
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  @Transform(({ value }) => value.map((tag: Subscriber) => tag.userId))
  public entities!: string;
}
