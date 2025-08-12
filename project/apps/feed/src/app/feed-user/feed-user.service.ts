import {Injectable} from "@nestjs/common";
import {FeedOptions, Post} from "@project/libs/shared/app/types";

@Injectable()
export class FeedUserService {
  public async getAll(options: FeedOptions) {
    // TODO обращение за данными

    const posts: Post[] = [];

    return posts;
  }
}
