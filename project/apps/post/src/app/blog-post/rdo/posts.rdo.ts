import { Expose } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class PostsRdo {
  @Expose()
  entities!: BasePostRdo[];
}
