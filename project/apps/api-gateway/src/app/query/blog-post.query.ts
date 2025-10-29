import { Transform } from 'class-transformer';
import { PostState } from '@project/types';
import { BlogPostConstants } from '../constants/blog-post.constants';

export class BlogPostQuery {
  @Transform(
    ({ value }) => +value || BlogPostConstants.DEFAULT_POST_COUNT_LIMIT
  )
  public limit = BlogPostConstants.DEFAULT_POST_COUNT_LIMIT;
  public 'tags[]'?: string[];
  public authorId?: string | string[];
  public status = PostState.Publised;
  public sortBy: string = BlogPostConstants.DEFAULT_SORT_TYPE;
  public sortDirection: string = BlogPostConstants.DEFAULT_SORT_DIRECTION;
  public page: number = BlogPostConstants.DEFAULT_PAGE_COUNT;
}
