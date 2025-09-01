import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { EnvFileStorageValidationMessage } from './file-storage.messages';
import { AppMode } from './types/app-mode.enum';
import { AppConst } from './types/app-const.enum';

export class FileStorageConfiguration {
  @IsString({ message: EnvFileStorageValidationMessage.EnvironmentRequired })
  @IsEnum(AppMode, { message: EnvFileStorageValidationMessage.EnvironmentType })
  public environment!: AppMode;

  @IsNumber({}, { message: EnvFileStorageValidationMessage.PortRequired })
  @IsOptional()
  @Min(AppConst.MIN_PORT)
  @Max(AppConst.MAX_PORT)
  public port: number = AppConst.DEFAULT_PORT;

  @IsString({
    message: EnvFileStorageValidationMessage.UploadDirectoryRequired,
  })
  public uploadDirectory!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
