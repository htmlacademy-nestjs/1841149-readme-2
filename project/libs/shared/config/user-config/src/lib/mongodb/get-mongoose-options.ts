import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}: Record<string, any>): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('db.user'),
          password: config.get<string>('db.password'),
          host: config.get<string>('db.host'),
          port: config.get<string>('db.port'),
          authDatabase: config.get<string>('db.authBase'),
          databaseName: config.get<string>('db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
