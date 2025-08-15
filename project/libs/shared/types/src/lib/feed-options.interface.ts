import {SortType} from "./sort-type.enum";

export interface FeedOptions {
  page: number;
  limit: number;
  sort: string;
  sortType: SortType;
  userId: string;
}
