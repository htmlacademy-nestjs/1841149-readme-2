import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  NotificationConfigModule,
  getMongooseOptions,
} from '@project/notification-config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { AuthorSubscriberModule } from './author-subscriber/author-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotificationConfigModule,
    EmailSubscriberModule,
    AuthorSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
