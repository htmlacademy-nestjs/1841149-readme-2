import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { JWTConfiguration } from "./jwt/jwt.env";

async function getJWTConfig(): Promise<JWTConfiguration> {
  const config = plainToClass(JWTConfiguration, {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

  await config.validate();

  return config;
}

export default registerAs('jwt', () => {
  return getJWTConfig();
});
