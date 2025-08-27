import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentPostEntity } from './comment-post.entity';
import { BasePostgresRepository } from '@project/core';
import { CommentPost } from '@project/types';
import { PrismaClientService } from '@project/models';

@Injectable()
export class CommentPostRepository extends BasePostgresRepository<
  CommentPostEntity,
  CommentPost
> {
  constructor(protected override readonly client: PrismaClientService) {
    super(client, CommentPostEntity.fromObject);
  }

  public override async save(
    entity: CommentPostEntity
  ): Promise<CommentPostEntity> {
    const record = await this.client.comment.create({
      data: {
        text: entity.text,
        authorId: entity.authorId,
        postId: entity.postId,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public override async findById(id: string): Promise<CommentPostEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        postId: id,
      },
      take: 50,
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: string): Promise<CommentPostEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId,
      },
      take: 50,
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
