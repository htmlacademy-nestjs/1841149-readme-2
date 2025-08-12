import { Module } from '@nestjs/common';
import {FileStorageModule} from "./file-storage/file-storage.module";

@Module({
  imports: [FileStorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
