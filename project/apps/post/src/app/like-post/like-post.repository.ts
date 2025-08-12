import {BaseMemoryRepository} from "@project/libs/shared/core";
import {LikePostEntity} from "./like-post.entity";

export class LikePostRepository extends BaseMemoryRepository<LikePostEntity> {
  public async findByPostId(postId: string) {
    const entities = Array.from(this.entities.values());

    return entities.find((entity) => entity.postId === postId);
  }
}
