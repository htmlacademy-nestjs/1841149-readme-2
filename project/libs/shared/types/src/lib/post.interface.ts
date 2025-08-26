import type {PostType} from "./post-type.enum";
import {PostState} from "./post-state.enum";
import {Tag} from "./tag.interface";
import {PostLike} from "./post-like.interface";
import {CommentPost} from "./comment.interface";

export interface Post {
  id?: string;
  authorId: string;
  tags?: Tag[];
  type: PostType;
  status: PostState;
  repost: boolean;
  likes: PostLike[];
  likeCount: number;
  comments: CommentPost[];
  commentCount: number;
  originalAuthorId?: string;
  originalPostId?: string;
  repostCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
