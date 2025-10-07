import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { EnvValidationMessage } from './rabbit.messages';
import { DEFAULT_MONGO_PORT, MAX_PORT, MIN_PORT } from './rabbit.const';

export class RabbitConfiguration {
  @IsString({ message: EnvValidationMessage.RabbitHostRequired })
  public host!: string;

  @IsString({ message: EnvValidationMessage.PasswordRequired })
  public password!: string;

  @IsNumber({}, { message: EnvValidationMessage.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

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
