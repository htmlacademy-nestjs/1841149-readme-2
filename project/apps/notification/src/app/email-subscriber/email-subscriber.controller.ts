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
    exchange: 'readme.notification',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notification.income',
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

  @Get('/rabbit')
  public async sendTestMessage() {
    try {
      const amqp = require('amqplib');
      const connection = await amqp.connect('amqp://admin:test@localhost:5672');
      const channel = await connection.createChannel();

      await channel.assertExchange('readme.notification', 'direct', {
        durable: true,
      });

      const testMessage = {
        id: 'test-' + Date.now(),
        email: 'rabbitmq-test@example.com',
        firstname: 'RabbitMQ',
        lastname: 'Test',
        userId: 'rabbitmq-test-user',
      };

      const sent = channel.publish(
        'readme.notification',
        RabbitRouting.AddSubscriber,
        Buffer.from(JSON.stringify(testMessage)),
        { persistent: true }
      );

      await channel.close();
      await connection.close();

      return {
        success: true,
        message: 'Test message sent to RabbitMQ',
        data: testMessage,
        sent: sent,
      };
    } catch (error) {
      return { error: error };
    }
  }
}
