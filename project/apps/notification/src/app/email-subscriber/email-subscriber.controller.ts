import { Controller, Get, Query } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/types';
import { MailService } from '../mail/mail.service';

@Controller('test')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notification.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notification',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @Get('')
  public async sendTestEmail() {
    const testSubscriber = {
      id: 'test-id',
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      userId: 'user-test-id',
    };

    try {
      await this.mailService.sendNotifyNewSubscriber(testSubscriber);
      return { message: 'Test email sent successfully!' };
    } catch (error) {
      return { error: 'Failed to send test email', details: error };
    }
  }
}
