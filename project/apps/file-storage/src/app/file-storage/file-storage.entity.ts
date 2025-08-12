import {File} from "@project/libs/shared/app/types";

export class FileStorageEntity implements File {
  public id?: string;
  public name: string;
  public path: string;
  public createdAt?: string;
  public updatedAt?: string;

  constructor(file: File) {
    this.populate(file);
  }

  public populate(data: File) {
    this.id = data.id;
    this.name = data.name;
    this.path = data.path;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
