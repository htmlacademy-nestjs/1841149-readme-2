import {Injectable} from "@nestjs/common";
import {FeedOptions, Post} from "@project/types";

@Injectable()
export class FeedUserService {
  public async getAll(options: FeedOptions) {
    // TODO обращение за данными

    const posts: Post[] = [];

    return posts;
  }
}
