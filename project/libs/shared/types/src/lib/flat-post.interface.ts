import { Tag } from './tag.interface';
import type { PostType } from './post-type.enum';
import { PostState } from './post-state.enum';
import { PostLike } from './post-like.interface';
import { CommentPost } from './comment.interface';

export interface FlatPost {
  id?: string;
  authorId: string;
  tags?: Tag[];
  type: PostType;
  status: PostState;
  repost: boolean;
  likes: PostLike[];
  likeCount: number;
  comments: CommentPost[];
  commentCount: number;
  originalAuthorId?: string;
  originalPostId?: string;
  repostCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  videoLink?: string;
  announce?: string;
  text?: string;
  photo?: string;
  link?: string;
  description?: string;
  quote?: string;
  quoteAuthor?: string;
}
