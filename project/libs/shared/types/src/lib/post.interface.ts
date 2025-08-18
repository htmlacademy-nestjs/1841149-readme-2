import {PostType} from "./post-type.enum";
import {PostState} from "./post-state.enum";

export interface Post {
  id?: string;
  tags?: string[];
  type: PostType;
  status: PostState;
  repost: boolean;
  repostAuthor?: string;
  repostCreatedAt?: string;
  originalAuthorId?: string;
  originalPostId?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
