import {PostLike} from "@project/types";

export class LikePostEntity implements PostLike {
  public id!: string;
  public userId!: string;
  public postId!: string;

  constructor(like: PostLike) {
    this.populate(like);
  }

  public populate(data: PostLike) {
    this.userId = data.userId;
    this.postId = data.postId;
  }

  public toObject() {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId,
    };
  }
}
