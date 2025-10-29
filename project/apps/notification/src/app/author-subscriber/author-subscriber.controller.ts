import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/types';
import { MailService } from '../mail/mail.service';
import { AuthorSubscriberService } from './author-subscriber.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto';
import { NewPostDto } from './dto/new-post.dto';

@Controller()
export class AuthorSubscriberController {
  constructor(
    private readonly subscriberService: AuthorSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.NewPostPublished,
    queue: 'readme.notification.new-post',
  })
  public async sendNewPostNotification(dto: NewPostDto): Promise<void> {
    const subscribers = await this.subscriberService.getSubscribersByAuthorId(
      dto.authorId
    );

    subscribers.map(async (subscriber) => {
      await this.mailService.sendNotifyNewPost({
        email: subscriber?.email,
        authorName: dto.authorName,
      });
    });
  }

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.AddSubscription,
    queue: 'readme.notification.new-subscription',
  })
  public async create(dto: CreateSubscriptionDto) {
    await this.subscriberService.addSubscriber(dto);
  }

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.DeleteSubscription,
    queue: 'readme.notification.delete-subscription',
  })
  public async delete(dto: DeleteSubscriptionDto): Promise<void> {
    await this.subscriberService.deleteSubscriber(dto);
  }
}
