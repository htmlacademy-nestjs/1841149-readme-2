import { PhotoPost } from './photo.post';
import { LinkPost } from './link.post';
import { QuotePost } from './quote.post';
import { VideoPost } from './video.post';
import { TextPost } from './text.post';
import { Post } from './post.interface';
import { PostType } from './post-type.enum';

type PostWithVideoContent = Post & { type: PostType.VIDEO } & {
  videoPost: VideoPost;
};
type PostWithTextContent = Post & { type: PostType.TEXT } & {
  textPost: TextPost;
};
type PostWithQuoteContent = Post & { type: PostType.QUOTE } & {
  quotePost: QuotePost;
};
type PostWithPhotoContent = Post & { type: PostType.PHOTO } & {
  photoPost: PhotoPost;
};
type PostWithLinkContent = Post & { type: PostType.LINK } & {
  linkPost: LinkPost;
};

export type PostUnion =
  | PostWithVideoContent
  | PostWithTextContent
  | PostWithQuoteContent
  | PostWithPhotoContent
  | PostWithLinkContent;
