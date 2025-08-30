import { BasePostgresRepository } from '@project/core';
import { LikePostEntity } from './like-post.entity';
import { PostLike } from '@project/types';
import { PrismaClientService } from '@project/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikePostRepository extends BasePostgresRepository<
  LikePostEntity,
  PostLike
> {
  constructor(protected override readonly client: PrismaClientService) {
    super(client, LikePostEntity.fromObject);
  }

  public override async save(entity: LikePostEntity): Promise<LikePostEntity> {
    const record = await this.client.like.create({
      data: {
        ...entity.toObject(),
      },
    });

    entity.id = record.id;
    return entity;
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }

  public async findByUserAndPostIds(
    postId: string,
    userId: string
  ): Promise<LikePostEntity | null> {
    const document = await this.client.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    return document ? this.createEntityFromDocument(document) : null;
  }

  public async findByPostId(postId: string): Promise<LikePostEntity[]> {
    const documents = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }
}
