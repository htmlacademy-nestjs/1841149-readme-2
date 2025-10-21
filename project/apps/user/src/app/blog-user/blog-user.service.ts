import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async incrementSubscriberCount(userId: string): Promise<void> {
    await this.blogUserRepository.updateSubscriberCount(userId, 1);
  }

  public async decrementSubscriberCount(userId: string): Promise<void> {
    await this.blogUserRepository.updateSubscriberCount(userId, -1);
  }
}
