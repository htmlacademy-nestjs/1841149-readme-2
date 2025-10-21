import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import type { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/types';
import { rabbitConfig } from '@project/config-user';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async subscribe(dto: CreateSubscriptionDto) {
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscription,
      { ...dto }
    );
  }

  public async unsubscribe(dto: DeleteSubscriptionDto) {
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.DeleteSubscription,
      { ...dto }
    );
  }
}
