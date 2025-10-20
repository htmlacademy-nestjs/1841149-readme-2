import { PostState } from '@project/types';
import { PostType } from '@project/types';

export class CreatePostDto {
  tags?: string[];
  type!: PostType;
  status!: PostState;
  repost?: boolean;
  title?: string;
  videoLink?: string;
  link?: string;
  description?: string;
  announce?: string;
  text?: string;
  quote?: string;
  quoteAuthor?: string;
  photo?: string;
  userId?: string;
}
