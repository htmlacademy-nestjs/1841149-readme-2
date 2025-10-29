import { Injectable } from '@nestjs/common';
import { AuthorSubscriberRepository } from './author-subscriber.repository';
import { AuthorSubscriber } from '@project/types';
import { AuthorSubscriberEntity } from './author-subscriber.entity';
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto';

@Injectable()
export class AuthorSubscriberService {
  constructor(
    private readonly authorSubscriberRepository: AuthorSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: AuthorSubscriber) {
    const { authorId, subscriberId } = subscriber;

    const existsSubscriber =
      await this.authorSubscriberRepository.findSubscription(
        authorId,
        subscriberId
      );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.authorSubscriberRepository.save(
      new AuthorSubscriberEntity().populate(subscriber)
    );
  }

  public async getSubscribersByAuthorId(authorId: string) {
    return await this.authorSubscriberRepository.findSubscribersByAuthorId(
      authorId
    );
  }

  public async deleteSubscriber(dto: DeleteSubscriptionDto): Promise<void> {
    await this.authorSubscriberRepository.deleteByUserAndAuthorId(dto);
  }
}
