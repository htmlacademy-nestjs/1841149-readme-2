import { AuthorSubscriber } from '@project/types';
import { Entity } from '@project/core';

export class AuthorSubscriberEntity
  implements AuthorSubscriber, Entity<string, AuthorSubscriber>
{
  public id?: string;
  public authorId!: string;
  public subscriberId!: string;
  public email!: string;

  public toObject() {
    return {
      id: this.id,
      authorId: this.authorId,
      subscriberId: this.subscriberId,
      email: this.email,
    };
  }

  public populate(data: AuthorSubscriber): AuthorSubscriberEntity {
    this.id = data.id ?? undefined;
    this.authorId = data.authorId;
    this.subscriberId = data.subscriberId;
    this.email = data.email;

    return this;
  }

  static fromObject(data: AuthorSubscriber): AuthorSubscriberEntity {
    return new AuthorSubscriberEntity().populate(data);
  }
}
