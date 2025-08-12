import {Injectable} from "@nestjs/common";
import {CommentPostEntity} from "./comment-post.entity";
import {CommentPostRepository} from "./comment-post.repository";

@Injectable()
export class CommentPostService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository
  ) {}

  public async getComments(postId: string) {
    return this.commentPostRepository.findByPostId(postId);
  }

  public async create(postId: string, dto: any) {
    const commentEntity = new CommentPostEntity({...dto, postId});

    // TODO обновления счетчика количества комментариев

    return this.commentPostRepository.save(commentEntity);
  }

  public async deleteComment(commentId: string) {
    // TODO обновления счетчика количества комментариев

    await this.commentPostRepository.deleteById(commentId);
  }

  public async deleteCommentsByPostId(postId: string) {
    // TODO
  }
}
