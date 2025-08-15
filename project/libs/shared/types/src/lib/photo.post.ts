import {Post} from "./post.interface";
import {PostType} from "./post-type.enum";

export interface PhotoPost extends Post {
  type: PostType.Photo;
  photo: string;
}
