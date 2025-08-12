import {Post} from "./post.interface";
import {PostType} from "./post-type.enum";

export interface VideoPost extends Post {
  type: PostType.Video;
  title: string;
  videoLink: string;
}
