import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/core';
import { AuthorSubscriberEntity } from './author-subscriber.entity';
import { AuthorSubscriberModel } from './author-subscriber.model';
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto';

@Injectable()
export class AuthorSubscriberRepository extends BaseMongoRepository<
  AuthorSubscriberEntity,
  AuthorSubscriberModel
> {
  constructor(
    @InjectModel(AuthorSubscriberModel.name)
    authorSubscriberModel: Model<AuthorSubscriberModel>
  ) {
    super(authorSubscriberModel, AuthorSubscriberEntity.fromObject);
  }

  public async findSubscribersByAuthorId(authorId: string) {
    const documents = await this.model.find({ authorId }).exec();

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findSubscription(authorId: string, subscriberId: string) {
    const document = await this.model
      .findOne({ authorId, subscriberId })
      .exec();

    return this.createEntityFromDocument(document);
  }

  public async deleteByUserAndAuthorId(
    dto: DeleteSubscriptionDto
  ): Promise<void> {
    await this.model
      .findOneAndDelete({
        authorId: dto.authorId,
        subscriberId: dto.subscriberId,
      })
      .exec();
  }
}
