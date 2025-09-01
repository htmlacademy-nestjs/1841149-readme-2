import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { AppConfiguration } from './app.env';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

async function getConfig(): Promise<AppConfiguration> {
  const config = plainToClass(AppConfiguration, {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  });

  await config.validate();

  return config;
}

export default registerAs('application', getConfig);
