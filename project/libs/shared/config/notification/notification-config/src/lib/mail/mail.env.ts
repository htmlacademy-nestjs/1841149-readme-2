import { EnvValidationMessage } from './mail.messages';
import { MAIL_CONFIG } from './mail.const';
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
  @Min(MAIL_CONFIG.MIN_PORT)
  @Max(MAIL_CONFIG.MAX_PORT)
  @IsOptional()
  public port: number = MAIL_CONFIG.DEFAULT_SMTP_PORT;

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
