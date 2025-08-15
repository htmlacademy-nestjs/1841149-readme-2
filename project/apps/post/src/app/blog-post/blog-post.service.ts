import {Injectable, NotFoundException} from "@nestjs/common";
import {BlogPostRepository} from "./blog-post.repository";
import {BlogPostEntity} from "./blog-post.entity";
import {UpdatePostDto} from "./dto/update-post.dto";
import {CreatePostUnionDto} from "./dto/create-post-union.dto";
import {PostType} from "@project/types";
import {fillDto} from "@project/helpers";
import {PhotoPostRdo} from "./rdo/photo-post.rdo";
import {LinkPostRdo} from "./rdo/link-post.rdo";
import {QuotePostRdo} from "./rdo/quote-post.rdo";
import {VideoPostRdo} from "./rdo/video-post.rdo";
import {TextPostRdo} from "./rdo/text-post.rdo";

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async index() {
    return await this.blogPostRepository.getAllPosts();
  }

  public async create(dto: CreatePostUnionDto) {
    const postEntity = new BlogPostEntity(dto)

    return this.blogPostRepository.save(postEntity);
  }

  public async show(id: string) {
    const post = await this.blogPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return post;
  }

  public async update(dto: UpdatePostDto) {
    const post = await this.blogPostRepository.findById(dto.id);

    if (!post) {
      throw new NotFoundException(`Post with id ${dto.id} not found.`);
    }

    if (dto.tags) {
      post.tags = dto.tags;
    }

    if (dto.publishAt) {
      post.publishAt = dto.publishAt;
    }

    if (dto.link) {
      post.link = dto.link;
    }

    if (dto.description) {
      post.description = dto.description;
    }

    if (dto.type) {
      post.type = dto.type;
    }

    if (dto.photo) {
      post.photo = dto.photo;
    }

    if (dto.quote) {
      post.quote = dto.quote;
    }

    if (dto.quoteAuthor) {
      post.quoteAuthor = dto.quoteAuthor;
    }

    if (dto.title) {
      post.title = dto.title;
    }

    if (dto.announce) {
      post.announce = dto.announce;
    }

    if (dto.text) {
      post.text = dto.text;
    }

    if (dto.videoLink) {
      post.videoLink = dto.videoLink;
    }

    return this.blogPostRepository.update(dto.id, post);
  }

  public async delete(id: string) {
    await this.blogPostRepository.deleteById(id);
  }

  public fillPostToCorrectRdo(post: any) {
    const postObject = post.toObject();

    switch (post.type) {
      case PostType.Photo:
        return fillDto(PhotoPostRdo, postObject);
      case PostType.Link:
        return fillDto(LinkPostRdo, postObject);
      case PostType.Quote:
        return fillDto(QuotePostRdo, postObject);
      case PostType.Video:
        return fillDto(VideoPostRdo, postObject);
      case PostType.Text:
        return fillDto(TextPostRdo, postObject);
      default:
        throw new Error(`Unsupported post type: ${post.type}`);
    }
  }
}
