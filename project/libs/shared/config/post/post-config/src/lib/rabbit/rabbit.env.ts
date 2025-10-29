import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { EnvValidationMessage } from './rabbit.messages';
import { RABBIT_CONFIG } from './rabbit.const';

export class RabbitConfiguration {
  @IsString({ message: EnvValidationMessage.RabbitHostRequired })
  public host!: string;

  @IsString({ message: EnvValidationMessage.PasswordRequired })
  public password!: string;

  @IsNumber({}, { message: EnvValidationMessage.PortRequired })
  @Min(RABBIT_CONFIG.MIN_PORT)
  @Max(RABBIT_CONFIG.MAX_PORT)
  @IsOptional()
  public port: number = RABBIT_CONFIG.DEFAULT_RABBIT_PORT;

  @IsString({ message: EnvValidationMessage.UserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.QueueRequired })
  public queue!: string;

  @IsString({ message: EnvValidationMessage.ExchangeRequired })
  public exchange!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
