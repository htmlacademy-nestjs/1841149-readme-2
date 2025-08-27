import { Post, PostState, PostType, PostUnion } from '@project/types';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TagPostEntity } from '../tag-post/tag-post.entity';
import { Entity } from '@project/core';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostEntity } from '../like-post/like-post.entity';
import { CommentPostEntity } from '../comment-post/comment-post.entity';

export class BlogPostEntity implements Post, Entity<string, PostUnion> {
  public id?: string;
  public authorId!: string;
  public tags!: TagPostEntity[];
  public type!: PostType;
  public status!: PostState;
  public createdAt!: Date;
  public updatedAt!: Date;
  public repost!: boolean;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public repostCreatedAt?: Date;
  public title?: string;
  public videoLink?: string;
  public announce?: string;
  public text?: string;
  public quote?: string;
  public quoteAuthor?: string;
  public photo?: string;
  public link?: string;
  public likes!: LikePostEntity[];
  public likeCount!: number;
  public comments!: CommentPostEntity[];
  public commentCount!: number;
  public description?: string;

  public toObject(): PostUnion {
    const basePost = {
      id: this.id,
      authorId: this.authorId,
      tags: this.tags.map((tag) => tag.toObject()),
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      repost: this.repost,
      likes: this.likes.map((like) => like.toObject()),
      likeCount: this.getLikeCount(),
      comments: this.comments.map((comment) => comment.toObject()),
      commentCount: this.getCommentCount(),
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      repostCreatedAt: this.repostCreatedAt,
    };

    switch (this.type) {
      case PostType.PHOTO:
        return {
          ...basePost,
          type: PostType.PHOTO,
          photo: this.photo!,
        };

      case PostType.LINK:
        return {
          ...basePost,
          type: PostType.LINK,
          link: this.link!,
          description: this.description,
        };

      case PostType.QUOTE:
        return {
          ...basePost,
          type: PostType.QUOTE,
          quote: this.quote!,
          quoteAuthor: this.quoteAuthor!,
        };

      case PostType.VIDEO:
        return {
          ...basePost,
          type: PostType.VIDEO,
          title: this.title!,
          videoLink: this.videoLink!,
        };

      case PostType.TEXT:
        return {
          ...basePost,
          type: PostType.TEXT,
          title: this.title!,
          announce: this.announce!,
          text: this.text!,
        };

      default:
        throw new HttpException(
          `Unknown post type: ${this.type}`,
          HttpStatus.BAD_REQUEST
        );
    }
  }

  public populate(data: PostUnion): BlogPostEntity {
    this.id = data.id;
    this.authorId = data.authorId;
    this.tags = data.tags?.map((tag) => TagPostEntity.fromObject(tag)) ?? [];
    this.likes =
      data.likes?.map((like) => LikePostEntity.fromObject(like)) ?? [];
    this.comments =
      data.comments?.map((comment) => CommentPostEntity.fromObject(comment)) ??
      [];
    this.type = data.type;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.repost = data.repost || false;
    this.originalAuthorId = data.originalAuthorId;
    this.originalPostId = data.originalPostId;
    this.repostCreatedAt = data.repostCreatedAt
      ? new Date(data.repostCreatedAt)
      : undefined;

    switch (data.type) {
      case PostType.PHOTO:
        this.photo = data.photo;
        break;

      case PostType.LINK:
        this.link = data.link;
        this.description = data.description;
        break;

      case PostType.QUOTE:
        this.quote = data.quote;
        this.quoteAuthor = data.quoteAuthor;
        break;

      case PostType.VIDEO:
        this.title = data.title;
        this.videoLink = data.videoLink;
        break;

      case PostType.TEXT:
        this.title = data.title;
        this.announce = data.announce;
        this.text = data.text;
        break;
    }

    return this;
  }

  public validate(): void {
    switch (this.type) {
      case PostType.PHOTO:
        if (!this.photo) {
          throw new HttpException(
            'Photo link is required',
            HttpStatus.BAD_REQUEST
          );
        }
        break;

      case PostType.LINK:
        if (!this.link) {
          throw new HttpException('Link is required', HttpStatus.BAD_REQUEST);
        }
        break;

      case PostType.QUOTE:
        if (!this.quote || !this.quoteAuthor) {
          throw new HttpException(
            'Quote and quote author are required',
            HttpStatus.BAD_REQUEST
          );
        }
        break;

      case PostType.VIDEO:
        if (!this.title || !this.videoLink) {
          throw new HttpException(
            'Title and video link are required',
            HttpStatus.BAD_REQUEST
          );
        }
        break;

      case PostType.TEXT:
        if (!this.title || !this.announce || !this.text) {
          throw new HttpException(
            'Title, announce, and text are required',
            HttpStatus.BAD_REQUEST
          );
        }
        break;
    }
  }

  static fromObject(data: PostUnion): BlogPostEntity {
    return new BlogPostEntity().populate(data);
  }

  static fromDTO(dto: CreatePostDto, tags: TagPostEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();

    entity.authorId = '123';
    entity.tags = tags;
    entity.type = dto.type;
    entity.status = dto.status ?? PostState.Publised;
    entity.repost = dto.repost ?? false;

    entity.title = dto.videoPost?.title;
    entity.videoLink = dto.videoPost?.videoLink;

    return entity;
  }

  public getLikeCount(): number {
    return this.likes?.length ?? 0;
  }

  public getCommentCount(): number {
    return this.comments?.length ?? 0;
  }
}
