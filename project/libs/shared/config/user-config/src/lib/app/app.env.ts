import {IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateOrReject} from "class-validator";
import {EnvAppValidationMessage} from "./app.messages";
import {DEFAULT_PORT, MAX_PORT, MIN_PORT} from "./app.const";
import {AppMode} from "./types/app-mode.enum";

export class AppConfiguration {
  @IsString({ message: EnvAppValidationMessage.EnvironmentRequired })
  @IsEnum(AppMode, {message: EnvAppValidationMessage.EnvironmentType})
  public environment: AppMode;

  @IsNumber({}, { message: EnvAppValidationMessage.PortRequired})
  @IsOptional()
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number = DEFAULT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
