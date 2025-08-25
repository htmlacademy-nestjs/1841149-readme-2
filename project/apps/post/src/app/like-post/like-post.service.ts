import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {LikePostRepository} from "./like-post.repository";
import {LikePostEntity} from "./like-post.entity";

@Injectable()
export class LikePostService {
  constructor(
    private readonly likePostRepository: LikePostRepository
  ) {}

  public async create(postId: string) {
    const existLike = (await this.likePostRepository.findByPostId(postId)).at(0);

    if (existLike) {
      throw new ConflictException(`Like for post with id: ${postId} already exist`);
    }

    // TODO Брать id пользователя из токена

    const newLike = new LikePostEntity({
      postId,
      userId: '1',
    })

    // TODO Логика обновления количества лайков
    await this.likePostRepository.save(newLike);


    return newLike;
  }

  public async delete(postId: string) {
    const existLike = (await this.likePostRepository.findByPostId(postId)).at(0);

    if (!existLike) {
      throw new NotFoundException(`Like for post with id: ${postId} does not exist`);
    }

    // TODO Логика обновления количества лайков

    return await this.likePostRepository.deleteById(existLike.id!);
  }

  public async deleteAllByPostId(postId: string) {
    const existLike = (await this.likePostRepository.findByPostId(postId)).at(0);

    if (!existLike) {
      throw new NotFoundException(`Like for post with id: ${postId} does not exist`);
    }

    return await this.likePostRepository.deleteByPostId(postId);
  }

  public async findByPostId(postId: string): Promise<LikePostEntity[]> {
    const existLike = (await this.likePostRepository.findByPostId(postId)).at(0);

    if (!existLike) {
      throw new NotFoundException(`Likes for post with id: ${postId} does not exist`);
    }

    return await this.likePostRepository.findByPostId(postId);
  }
}
