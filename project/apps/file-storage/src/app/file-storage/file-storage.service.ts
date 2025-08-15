import {Injectable, NotFoundException} from "@nestjs/common";
import {File} from "@project/types";
import {FileStorageRepository} from "./file-storage.repository";
import {FileStorageEntity} from "./file-storage.entity";

@Injectable()
export class FileStorageService {
  constructor(
    private readonly fileStorageRepository: FileStorageRepository
  ) {}

  public async uploadFile(file: File) {
    const newFile = new FileStorageEntity(file);

    return this.fileStorageRepository.save(newFile);
  }

  public async getFile(id: string) {
    const file = await this.fileStorageRepository.findById(id);

    if (!file) {
      throw new NotFoundException(`Could not find file with id: ${id}`);
    }

    return file;
  }
}
