import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { fillDto } from '@project/helpers';
import { CreateSubscriptionRdo } from './rdo/create-subscription.rdo';
import { SubscribersRdo } from './rdo/subscribtions.rdo';
import { NotifyService } from '../notification/notification.service';
import type { RequestWithTokenPayload } from '@project/types';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly notificationService: NotifyService
  ) {}

  @ApiResponse({
    type: CreateSubscriptionRdo,
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  public async create(
    @Param('userId') userId: string,
    @Headers('X-UserId') subscriberId: string,
    @Req() { user: payload }: RequestWithTokenPayload
  ) {
    const newSubscription = await this.subscriberService.create({
      userId: userId,
      subscriberId: subscriberId,
    });

    if (payload) {
      await this.notificationService.subscribe({
        authorId: userId,
        subscriberId: subscriberId,
        email: payload.email,
      });
    }

    return fillDto(CreateSubscriptionRdo, newSubscription);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully unsubscribe',
  })
  @Delete(':userId')
  public async delete(
    @Param('userId') userId: string,
    @Headers('X-UserId') subscriberId: string
  ) {
    await this.subscriberService.delete({
      userId: userId,
      subscriberId: subscriberId,
    });

    await this.notificationService.unsubscribe({
      authorId: userId,
      subscriberId: subscriberId,
    });
  }

  @Get('')
  public async findSubscriptions(@Headers('X-UserId') userId: string) {
    const subscriptions =
      await this.subscriberService.finAllSubscriptionsByUserId(userId);

    const result = {
      entities: subscriptions.map((subscription) => subscription.toObject()),
    };

    return fillDto(SubscribersRdo, result);
  }
}
