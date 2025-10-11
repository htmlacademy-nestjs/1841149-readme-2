import { ConfigService } from '@nestjs/config';
import { RabbitConfiguration } from './rabbit.env';
import { DEFAULT_RABBIT_PORT } from './rabbit.const';

export async function getRabbitOptions(
  configService: ConfigService
): Promise<RabbitConfiguration> {
  const config = new RabbitConfiguration();

  config.host = configService.getOrThrow<string>('rabbit.host');
  config.password = configService.getOrThrow<string>('rabbit.password');
  config.port = configService.get<number>('rabbit.port') ?? DEFAULT_RABBIT_PORT;
  config.user = configService.getOrThrow<string>('rabbit.user');
  config.queue = configService.getOrThrow<string>('rabbit.queue');
  config.exchange = configService.getOrThrow<string>('rabbit.exchange');

  await config.validate();
  return config;
}
