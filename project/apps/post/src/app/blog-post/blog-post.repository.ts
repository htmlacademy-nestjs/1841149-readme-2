import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from "@project/libs/shared/core";
import {BlogPostEntity} from "./blog-post.entity";

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  public async getAllPosts() {
    const entities = Array.from(this.entities.values())
    // TODO Добавить логику сортировки фильтрации и пагинации

    return entities;
  }
}
