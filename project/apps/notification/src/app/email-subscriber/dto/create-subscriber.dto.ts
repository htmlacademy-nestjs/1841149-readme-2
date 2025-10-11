import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailValidationMessages } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailValidationMessages.email.format })
  public email!: string;

  @IsNotEmpty({ message: EmailValidationMessages.firstName.format })
  public firstname!: string;

  @IsNotEmpty({ message: EmailValidationMessages.lastName.format })
  public lastname!: string;

  @IsNotEmpty({ message: EmailValidationMessages.userId.format })
  public userId!: string;
}
