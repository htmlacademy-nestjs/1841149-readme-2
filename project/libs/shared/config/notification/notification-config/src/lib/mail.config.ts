import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { MailConfiguration } from './mail/mail.env';
import { DEFAULT_SMTP_PORT } from './mail/mail.const';

async function getMailConfig(): Promise<MailConfiguration> {
  const config = plainToClass(MailConfiguration, {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(
      process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(),
      10
    ),
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
  });

  await config.validate();
  return config;
}

export default registerAs('mail', async () => {
  return await getMailConfig();
});
