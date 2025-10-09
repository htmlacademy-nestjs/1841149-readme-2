import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { Subscriber } from '@project/types';
import { mailConfig } from '@project/notification-config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    @Inject(mailConfig.KEY)
    private readonly notifyConfig: ConfigType<typeof mailConfig>
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    try {
      await this.mailerService.sendMail({
        from: this.notifyConfig.from,
        to: subscriber.email,
        subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
        template: './add-subscriber',
        context: {
          user: `${subscriber.firstname} ${subscriber.lastname}`,
          email: `${subscriber.email}`,
        },
      });

      this.logger.log(`Notification email sent to ${subscriber.email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${subscriber.email}`);
      throw error;
    }
  }
}
