import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { SubscriberRepository } from './subscriber.repository';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema },
    ]),
    BlogUserModule,
    NotificationModule,
  ],
  providers: [SubscriberService, SubscriberRepository],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
