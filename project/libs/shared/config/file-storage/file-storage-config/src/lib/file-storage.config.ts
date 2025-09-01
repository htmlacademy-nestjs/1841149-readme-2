import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { FileStorageConfiguration } from './file-storage.env';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

async function getConfig(): Promise<FileStorageConfiguration> {
  const config = plainToClass(FileStorageConfiguration, {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  });

  await config.validate();

  return config;
}

export default registerAs('application', getConfig);
