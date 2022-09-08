import { Request } from 'express';
import { user } from '../src/userLogin/login.entity';

export interface ExpressRequest extends Request {
  user?: user;
  authorization?: string;
}
