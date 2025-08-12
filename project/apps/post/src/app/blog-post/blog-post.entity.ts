import {
  LinkPost,
  PhotoPost,
  Post,
  PostState,
  PostType,
  QuotePost,
  TextPost,
  VideoPost
} from "@project/libs/shared/app/types";
import {HttpException, HttpStatus} from "@nestjs/common";

export class BlogPostEntity implements Post {
  public id: string;
  public tags: string[];
  public type: PostType;
  public status: PostState;
  public publishAt: string;
  public updatedAt: string;
  public repost: boolean;
  public repostAuthor: string;
  public author: string;
  public photo?: string;
  public link?: string;
  public description?: string;
  public quote?: string;
  public quoteAuthor?: string;
  public title?: string;
  public videoLink?: string;
  public announce?: string;
  public text?: string;

  constructor(post: PhotoPost | LinkPost | QuotePost | VideoPost | TextPost) {
    this.populate(post)
  }

  public toObject() {
    const basePost = {
      id: this.id,
      tags: this.tags,
      status: this.status,
      publishAt: this.publishAt,
      updatedAt: this.updatedAt,
      repost: this.repost,
      repostAuthor: this.repostAuthor,
      author: this.author,
    };

    switch (this.type) {
      case PostType.Photo:
        if (!this.photo) {
          throw new HttpException("No photo", HttpStatus.NOT_FOUND);
        }
        return { ...basePost, type: PostType.Photo, photo: this.photo };
      case PostType.Link:
        if (!this.link) {
          throw new HttpException("No link", HttpStatus.NOT_FOUND);
        }
        return { ...basePost, type: PostType.Link, link: this.link, description: this.description };
      case PostType.Quote:
        if (!this.quote || !this.quoteAuthor) {
          throw new HttpException("No quote and quote author", HttpStatus.NOT_FOUND);
        }
        return { ...basePost, type: PostType.Quote, quote: this.quote, quoteAuthor: this.quoteAuthor };
      case PostType.Video:
        if (!this.title || !this.videoLink) {
          throw new HttpException("No title or video link", HttpStatus.NOT_FOUND);
        }
        return { ...basePost, type: PostType.Video, title: this.title, videoLink: this.videoLink };
      case PostType.Text:
        if (!this.title || !this.announce || !this.text) {
          throw new HttpException("No title or announce or text", HttpStatus.NOT_FOUND);
        }
        return { ...basePost, type: PostType.Text, title: this.title, announce: this.announce, text: this.text };
    }
  }

  public populate(data: PhotoPost | LinkPost | QuotePost | VideoPost | TextPost): void {
    this.tags = data.tags || [];
    this.type = data.type;
    this.status = data.status;
    this.publishAt = data.publishAt;
    this.updatedAt = data.updatedAt;
    this.repost = data.repost;
    this.repostAuthor = data.repostAuthor;
    this.author = data.author;

    switch (data.type) {
      case PostType.Photo:
        this.photo = data.photo;
        break
      case PostType.Link:
        this.link = data.link;
        break
      case PostType.Quote:
        this.quote = data.quote;
        this.quoteAuthor = data.quoteAuthor;
        break
      case PostType.Video:
        break
      case PostType.Text:
        this.title = data.title;
        this.announce = data.announce
        this.text = data.text
        break
    }
  }
}
