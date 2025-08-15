import {Injectable} from "@nestjs/common";
import {BaseMemoryRepository} from "@project/core";
import {FileStorageEntity} from "./file-storage.entity";

@Injectable()
export class FileStorageRepository extends BaseMemoryRepository<FileStorageEntity> {}
