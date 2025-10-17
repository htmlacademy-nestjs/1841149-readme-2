import { IsString, validateOrReject } from 'class-validator';
import { EnvValidationMessage } from './jwt.messages';

export class JWTConfiguration {
  @IsString({ message: EnvValidationMessage.AccessTokenSecretRequired })
  public accessTokenSecret!: string;

  @IsString({ message: EnvValidationMessage.AccessTokenExpiresInRequired })
  public accessTokenExpiresIn!: string;

  @IsString({ message: EnvValidationMessage.RefreshTokenSecretRequired })
  public refreshTokenSecret!: string;

  @IsString({ message: EnvValidationMessage.RefreshTokenExpiresInRequired })
  public refreshTokenExpiresIn!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
