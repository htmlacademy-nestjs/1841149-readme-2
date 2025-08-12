import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {LikePostRepository} from "./like-post.repository";
import {LikePostEntity} from "./like-post.entity";

@Injectable()
export class LikePostService {
  constructor(
    private readonly likePostRepository: LikePostRepository
  ) {}

  public async create(postId: string) {
    const existLike = await this.likePostRepository.findByPostId(postId);

    if (existLike) {
      throw new ConflictException(`Like for post with id: ${postId} already exist`);
    }

    // TODO Брать id пользователя из токена

    const newLike = new LikePostEntity({
      postId,
      userId: '1',
    })

    // TODO Логика обновления количества лайков

    return this.likePostRepository.save(newLike);
  }

  public async delete(postId: string) {
    const existLike = await this.likePostRepository.findByPostId(postId);

    if (!existLike) {
      throw new NotFoundException(`Like for post with id: ${postId} does not exist`);
    }

    // TODO Логика обновления количества лайков

    await this.likePostRepository.deleteById(existLike.id);
  }
}
