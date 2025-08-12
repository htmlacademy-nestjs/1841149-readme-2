import {Injectable} from "@nestjs/common";
import {RepostPostRepository} from "./repost-post.repository";

@Injectable()
export class RepostPostService {
  constructor(
    private readonly repostPostRepository: RepostPostRepository
  ) {}
  public async create(postId: string) {
    // TODO
    // TODO Найти нужный пост, скопировать его и добавить поля repostAuthor, repost поменять на true, обновить дату публикации
    //
    // const newRepostPost = new RepostPostEntity({
    //   // ...post,
    //   repost: true,
    //   repostAuthor: '1',
    //   publishAt: new Date().toISOString(),
    // });
  }

  public async delete(id: string) {
    await this.repostPostRepository.deleteById(id);
  }
}
