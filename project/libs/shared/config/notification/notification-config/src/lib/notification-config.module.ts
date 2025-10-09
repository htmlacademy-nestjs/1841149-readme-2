import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './mongo.config';
import rabbitConfig from './rabbit.config';
import MailConfig from './mail.config';

const ENV_USERS_FILE_PATH = 'apps/notification/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [mongoConfig, rabbitConfig, MailConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class NotificationConfigModule {}
