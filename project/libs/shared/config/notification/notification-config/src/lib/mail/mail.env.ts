import { EnvValidationMessage } from './mail.messages';
import { MIN_PORT, MAX_PORT, DEFAULT_SMTP_PORT } from './mail.const';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

export class MailConfiguration {
  @IsString({ message: EnvValidationMessage.MailHostRequired })
  public host!: string;

  @IsNumber({}, { message: EnvValidationMessage.MailPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_SMTP_PORT;

  @IsString({ message: EnvValidationMessage.MailUserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.MailPasswordRequired })
  public password!: string;

  @IsString({ message: EnvValidationMessage.MailFromRequired })
  public from!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
