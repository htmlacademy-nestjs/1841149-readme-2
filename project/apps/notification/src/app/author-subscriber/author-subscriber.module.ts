import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { MailModule } from '../mail/mail.module';
import {
  AuthorSubscriberModel,
  AuthorSubscriberSchema,
} from './author-subscriber.model';
import { AuthorSubscriberController } from './author-subscriber.controller';
import { AuthorSubscriberService } from './author-subscriber.service';
import { AuthorSubscriberRepository } from './author-subscriber.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthorSubscriberModel.name, schema: AuthorSubscriberSchema },
    ]),
    RabbitMQModule.forRootAsync(getRabbitMQOptions('rabbit')),
    MailModule,
  ],
  controllers: [AuthorSubscriberController],
  providers: [AuthorSubscriberService, AuthorSubscriberRepository],
})
export class AuthorSubscriberModule {}
