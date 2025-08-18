import { Tag } from '@project/types';
import { Entity } from '@project/core';

export class TagPostEntity implements Tag, Entity<string> {
  public id?: string;
  public title!: string;
  public createdAt?: string;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? '';
    this.title = data.title;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toObject(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
    }
  }
}
