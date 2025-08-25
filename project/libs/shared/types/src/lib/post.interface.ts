import type {PostType} from "./post-type.enum";
import {PostState} from "./post-state.enum";
import {Tag} from "./tag.interface";

export interface Post {
  id?: string;
  authorId: string;
  tags?: Tag[];
  type: PostType;
  status: PostState;
  repost: boolean;
  originalAuthorId?: string;
  originalPostId?: string;
  repostCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
