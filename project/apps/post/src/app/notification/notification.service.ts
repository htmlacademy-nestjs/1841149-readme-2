import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import type { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/types';
import { rabbitConfig } from '@project/config-user';
import { NewPostDto } from './dto/new-post.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async notifyNewPost(dto: NewPostDto) {
    console.log('Notify new post', dto);
    console.log(this.rabbiOptions.exchange);
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.NewPostPublished,
      { ...dto }
    );
  }
}
