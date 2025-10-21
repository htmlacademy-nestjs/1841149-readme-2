import { Entity } from '@project/core';
import { Subscriber } from '@project/types';

export class SubscriberEntity implements Subscriber, Entity<string> {
  public id!: string;
  public subscriberId!: string;
  public userId!: string;
  public createdAt?: Date;

  constructor(subscriber: Subscriber) {
    this.populate(subscriber);
  }

  public populate(data: Subscriber): void {
    this.userId = data.userId;
    this.subscriberId = data.subscriberId;
    this.createdAt = data.createdAt;
  }

  public toObject() {
    return {
      id: this.id,
      userId: this.userId,
      subscriberId: this.subscriberId,
      createdAt: this.createdAt,
    };
  }

  static fromObject(data: Subscriber): SubscriberEntity {
    return new SubscriberEntity(data);
  }
}
