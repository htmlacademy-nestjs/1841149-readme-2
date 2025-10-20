import { PostType, PostState } from '@project/types';

export class UpdatePostDto {
  id!: string;
  tags?: string[];
  type!: PostType;
  status!: PostState;
  title?: string;
  videoLink?: string;
  link?: string;
  description?: string;
  announce?: string;
  text?: string;
  quote?: string;
  quoteAuthor?: string;
  photo?: string;
}
