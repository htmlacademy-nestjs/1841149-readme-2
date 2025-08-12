import {Injectable, NotFoundException} from "@nestjs/common";
import {BlogPostRepository} from "./blog-post.repository";
import {CreateQuotePostDto} from "./dto/create-quote-post.dto";
import {CreateVideoPostDto} from "./dto/create-video-post.dto";
import {CreateTextPostDto} from "./dto/create-text-post.dto";
import {CreateLinkPostDto} from "./dto/create-link-post.dto";
import {CreatePhotoPostDto} from "./dto/create-photo-post.dto";
import {BlogPostEntity} from "./blog-post.entity";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async index() {
    return await this.blogPostRepository.getAllPosts();
  }

  public async create(dto: CreateQuotePostDto | CreateVideoPostDto | CreateTextPostDto | CreateLinkPostDto | CreatePhotoPostDto) {
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
}
