import { Tag } from '@project/types';
import { Entity } from '@project/core';

export class TagPostEntity implements Tag, Entity<string, Tag> {
  public id?: string;
  public title!: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  public toObject(): Tag {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Tag): TagPostEntity {
    return new TagPostEntity(data);
  }
}
