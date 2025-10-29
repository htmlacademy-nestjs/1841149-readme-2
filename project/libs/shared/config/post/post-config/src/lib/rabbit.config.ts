import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { RabbitConfiguration } from './rabbit/rabbit.env';
import { RABBIT_CONFIG } from './rabbit/rabbit.const';

async function getRabbitConfig(): Promise<RabbitConfiguration> {
  const config = plainToClass(RabbitConfiguration, {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: process.env.RABBIT_PORT
      ? parseInt(process.env.RABBIT_PORT, 10)
      : RABBIT_CONFIG.DEFAULT_RABBIT_PORT,
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  });

  await config.validate();
  return config;
}

export default registerAs('rabbit', async () => {
  return await getRabbitConfig();
});
