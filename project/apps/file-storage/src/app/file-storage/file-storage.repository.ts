import {Injectable} from "@nestjs/common";
import {BaseMemoryRepository} from "@project/libs/shared/core";
import {FileStorageEntity} from "./file-storage.entity";

@Injectable()
export class FileStorageRepository extends BaseMemoryRepository<FileStorageEntity> {}
