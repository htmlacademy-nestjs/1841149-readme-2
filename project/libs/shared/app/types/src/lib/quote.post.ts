import {Post} from "./post.interface";
import {PostType} from "./post-type.enum";

export interface QuotePost extends Post {
  type: PostType.Quote;
  quote: string;
  quoteAuthor: string;
}
