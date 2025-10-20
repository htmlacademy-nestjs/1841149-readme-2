import { User, TokenPayload } from '@project/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id!,
    email: user.email,
    lastname: user.lastName,
    firstname: user.firstName,
  };
}
