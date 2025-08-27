import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { EnvAppValidationMessage } from './app.messages';
import { AppMode } from './types/app-mode.enum';
import { AppConst } from './types/app-const.enum';

export class AppConfiguration {
  @IsString({ message: EnvAppValidationMessage.EnvironmentRequired })
  @IsEnum(AppMode, { message: EnvAppValidationMessage.EnvironmentType })
  public environment!: AppMode;

  @IsNumber({}, { message: EnvAppValidationMessage.PortRequired })
  @IsOptional()
  @Min(AppConst.MIN_PORT)
  @Max(AppConst.MAX_PORT)
  public port: number = AppConst.DEFAULT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
