import {Injectable} from "@nestjs/common";
import {CommentPostEntity} from "./comment-post.entity";
import {CommentPostRepository} from "./comment-post.repository";
import {BlogPostService} from "../blog-post/blog-post.service";

@Injectable()
export class CommentPostService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async getComments(postId: string) {
    return this.commentPostRepository.findByPostId(postId);
  }

  public async create(postId: string, dto: any) {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = CommentPostEntity.fromDto(dto, existsPost.id!);
    return this.commentPostRepository.save(newComment);
  }

  public async deleteComment(commentId: string) {
    await this.commentPostRepository.deleteById(commentId);
  }
}
