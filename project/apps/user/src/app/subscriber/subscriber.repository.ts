import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriberModel } from './subscriber.model';
import { SubscriberEntity } from './subscriber.entity';
import { BaseMongoRepository } from '@project/core';
import { Subscriber } from '@project/types';

export class SubscriberRepository extends BaseMongoRepository<
  SubscriberEntity,
  SubscriberModel
> {
  constructor(
    @InjectModel(SubscriberModel.name)
    subscriberModel: Model<SubscriberModel>
  ) {
    super(subscriberModel, SubscriberEntity.fromObject);
  }

  public override async save(entity: SubscriberEntity) {
    const entityObject = entity.toObject();

    const record = await this.model.create(entityObject);

    entity.id = (record._id as string).toString();
    return entity;
  }

  public async find(
    userId: string,
    subscriberId: string
  ): Promise<Subscriber | null> {
    return await this.model
      .findOne({
        userId,
        subscriberId,
      })
      .exec();
  }

  public async delete(id: string) {
    await this.model.deleteOne({
      _id: id,
    });
  }

  public async findSubscribersByUserId(
    userId: string
  ): Promise<SubscriberEntity[]> {
    return await this.model
      .find({
        subscriberId: userId,
      })
      .exec();
  }
}
