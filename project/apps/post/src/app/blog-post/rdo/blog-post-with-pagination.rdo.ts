import { Expose, Type } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class BlogPostWithPaginationRdo {
  @Expose()
  @Type(() => BasePostRdo)
  public entities!: BasePostRdo[];

  @Expose()
  public totalPages!: number;

  @Expose()
  public totalItems!: number;

  @Expose()
  public currentPage!: number;

  @Expose()
  public itemsPerPage!: number;
}
