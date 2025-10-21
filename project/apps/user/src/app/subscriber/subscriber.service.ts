import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { CreateSubscriptionDto } from './dto/create-subsctiption.dto';
import { DeleteSubscriptionDto } from './dto/delete-subsctiption.dto';
import { SubscriberEntity } from './subscriber.entity';
import { BlogUserService } from '../blog-user/blog-user.service';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly blogUserService: BlogUserService
  ) {}

  public async create(dto: CreateSubscriptionDto) {
    const existSubscribe = await this.subscriberRepository.find(
      dto.userId,
      dto.subscriberId
    );

    if (existSubscribe) {
      throw new ConflictException(
        `You have already subscribe to user with ID ${dto.userId}`
      );
    }

    const newSubscriber = new SubscriberEntity(dto);

    await this.blogUserService.incrementSubscriberCount(dto.userId);

    return this.subscriberRepository.save(newSubscriber);
  }

  public async delete(dto: DeleteSubscriptionDto) {
    const existSubscribe = await this.subscriberRepository.find(
      dto.userId,
      dto.subscriberId
    );

    if (!existSubscribe) {
      throw new BadRequestException(
        `You are not subscribe to user with ID ${dto.userId}`
      );
    }

    await this.blogUserService.decrementSubscriberCount(dto.userId);

    return this.subscriberRepository.delete(existSubscribe.id!);
  }

  public async finAllSubscriptionsByUserId(id: string) {
    return await this.subscriberRepository.findSubscribersByUserId(id);
  }
}
