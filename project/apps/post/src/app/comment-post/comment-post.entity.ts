import {CommentPost} from "@project/types";
import {Entity} from "@project/core";
import {CreateCommentDto} from "./dto/create-comment.dto";

export class CommentPostEntity implements CommentPost, Entity<string, CommentPost> {
  public id?: string;
  public text!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public authorId!: string;
  public postId!: string;

  public toObject(): CommentPost {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      authorId: this.authorId,
      postId: this.postId
    };
  }

  public populate(data: CommentPost): CommentPostEntity {
    this.id = data.id ?? undefined;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.authorId = data.authorId;
    this.postId = data.postId!;

    return this;
  }

  static fromObject(data: CommentPost): CommentPostEntity {
    return new CommentPostEntity()
      .populate(data);
  }

  static fromDto(dto: CreateCommentDto, postId: string): CommentPostEntity {
    return new CommentPostEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
}
