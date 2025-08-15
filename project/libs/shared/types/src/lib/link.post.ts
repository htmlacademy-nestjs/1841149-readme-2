import {Post} from "./post.interface";
import {PostType} from "./post-type.enum";

export interface LinkPost extends Post {
  type: PostType.Link;
  link: string;
  description?: string;
}
