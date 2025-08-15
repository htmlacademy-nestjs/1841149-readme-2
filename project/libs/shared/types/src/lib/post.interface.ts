import {PostType} from "./post-type.enum";
import {PostState} from "./post-state.enum";

export interface Post {
  id?: string;
  tags?: string[];
  type: PostType;
  status: PostState;
  publishAt: string;
  updatedAt: string;
  repost: boolean;
  repostAuthor: string;
  author: string;
}
