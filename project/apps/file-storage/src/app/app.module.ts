import { Module } from '@nestjs/common';
import { FileStorageModule } from './file-storage/file-storage.module';
import {
  FileStorageConfigModule,
  getMongooseOptions,
} from '@project/file-storage-config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileStorageModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
