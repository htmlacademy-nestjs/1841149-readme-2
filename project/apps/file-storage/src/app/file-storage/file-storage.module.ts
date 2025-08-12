import {Module} from "@nestjs/common";
import {FileStorageController} from "./file-storage.controller";
import {FileStorageService} from "./file-storage.service";
import {FileStorageRepository} from "./file-storage.repository";

@Module({
  controllers: [FileStorageController],
  providers: [FileStorageService, FileStorageRepository],
})
export class FileStorageModule {}
