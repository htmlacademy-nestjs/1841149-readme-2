import {CommentPost} from "@project/libs/shared/app/types";

export class CommentPostEntity implements CommentPost {
  public id: string;
  public text: string;
  public createdAt: string;
  public author: string;
  public postId: string;

  constructor(post: CommentPost) {
    this.populate(post);
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      author: this.author,
      postId: this.postId
    };
  }

  public populate(data: CommentPost): void {
    this.id = data.id;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.author = data.author;
    this.postId = data.postId;
  }
}
