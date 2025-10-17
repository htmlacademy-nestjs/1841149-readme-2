import { Transform } from 'class-transformer';
import { BlogPostConstants } from '../constants/blog-post.constants';

export class BlogPostSearchQuery {
  @Transform(
    ({ value }) => +value || BlogPostConstants.DEFAULT_POST_COUNT_LIMIT
  )
  public limit = BlogPostConstants.DEFAULT_POST_COUNT_LIMIT;
  public page: number = BlogPostConstants.DEFAULT_PAGE_COUNT;
  public title!: string;
}
