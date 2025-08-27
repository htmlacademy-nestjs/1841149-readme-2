import { PostLike } from '@project/types';
import { Entity } from '@project/core';

export class LikePostEntity implements PostLike, Entity<string, PostLike> {
  public id?: string;
  public userId!: string;
  public postId!: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(like: PostLike) {
    this.populate(like);
  }

  public populate(data: PostLike) {
    this.id = data.id;
    this.userId = data.userId;
    this.postId = data.postId;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  public toObject() {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: PostLike): LikePostEntity {
    return new LikePostEntity(data);
  }
}
