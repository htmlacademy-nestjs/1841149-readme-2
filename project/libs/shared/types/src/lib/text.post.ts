import {Post} from "./post.interface";
import {PostType} from "./post-type.enum";

export interface TextPost extends Post {
  type: PostType.Text;
  title: string;
  announce: string;
  text: string;
}
