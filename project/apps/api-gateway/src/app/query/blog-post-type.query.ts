import { Transform } from 'class-transformer';
import { BlogPostConstants } from '../constants/blog-post.constants';

export class BlogPostTypeQuery {
  @Transform(
    ({ value }) => +value || BlogPostConstants.DEFAULT_POST_COUNT_LIMIT
  )
  public limit = BlogPostConstants.DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => +value || BlogPostConstants.DEFAULT_PAGE_COUNT)
  public page: number = BlogPostConstants.DEFAULT_PAGE_COUNT;
}
