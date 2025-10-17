import { EnvValidationMessage } from './mongo.messages';
import { MONGO_CONFIG } from './mongo.const';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name!: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host!: string;

  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  @Min(MONGO_CONFIG.MIN_PORT)
  @Max(MONGO_CONFIG.MAX_PORT)
  @IsOptional()
  public port: number = MONGO_CONFIG.DEFAULT_MONGO_PORT;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password!: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
