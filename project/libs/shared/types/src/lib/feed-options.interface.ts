import { SortDirection } from './sort-direction.enum';

export interface FeedOptions {
  page: number;
  limit: number;
  sort: string;
  sortType: SortDirection;
  userId: string;
}
