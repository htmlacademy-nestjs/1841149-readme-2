import {Injectable} from "@nestjs/common";
import {BaseMemoryRepository} from "@project/core";
import {CommentPostEntity} from "./comment-post.entity";

@Injectable()
export class CommentPostRepository extends BaseMemoryRepository<CommentPostEntity> {
  public findByPostId(postId: string) {
    const entities = Array.from(this.entities.values()).filter((entity) => entity.postId === postId);
    return Promise.resolve(entities);
  }
}
