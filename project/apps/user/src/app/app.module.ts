import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUserModule, getMongooseOptions } from '@project/config-user';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUserModule,
    NotificationModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    SubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
