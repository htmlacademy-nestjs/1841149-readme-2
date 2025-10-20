import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentPostEntity } from './comment-post.entity';
import { BasePostgresRepository } from '@project/core';
import { CommentPost } from '@project/types';
import { PrismaClientService } from '@project/models';
import { CommentPostQuery } from './query/comment-post.query';
import { Prisma } from '@prisma/client';
import { PaginationResult } from '@project/types';

@Injectable()
export class CommentPostRepository extends BasePostgresRepository<
  CommentPostEntity,
  CommentPost
> {
  constructor(protected override readonly client: PrismaClientService) {
    super(client, CommentPostEntity.fromObject);
  }

  private async getCommentCount(
    where: Prisma.CommentWhereInput
  ): Promise<number> {
    return this.client.comment.count({ where });
  }

  private calculateCommentsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(
    entity: CommentPostEntity
  ): Promise<CommentPostEntity> {
    const existComment = await this.client.comment.findFirst({
      where: {
        postId: entity.postId,
        authorId: entity.authorId,
      },
    });

    if (existComment) {
      throw new ConflictException(
        `Comment for post with id ${existComment.id} already exists`
      );
    }

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
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(
    postId: string,
    query: CommentPostQuery
  ): Promise<PaginationResult<CommentPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = {};
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    where.postId = postId;

    const [records, commentCount] = await Promise.all([
      this.client.comment.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getCommentCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentsPage(commentCount, take),
      itemsPerPage: take,
      totalItems: commentCount,
    };
  }

  public override async deleteById(id: string, userId: string): Promise<void> {
    const existComment = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!existComment) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    if (existComment.authorId !== userId) {
      throw new BadRequestException(`You can't delete not yours comment.`);
    }

    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
