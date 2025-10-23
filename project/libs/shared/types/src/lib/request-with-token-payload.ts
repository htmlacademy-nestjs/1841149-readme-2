import { TokenPayload } from './token-payload.interface';
import { Request } from 'express';

export interface RequestWithTokenPayload extends Request {
  user?: TokenPayload;
}
