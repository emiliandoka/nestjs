import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExpressRequest } from 'types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { LoginService } from '../login.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly LoginService: LoginService) {}

  async use(req: ExpressRequest, _: Response, next: (error?: any) => void) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET);
      const user = await this.LoginService.findOne(decode);
      req.user = user[0];

      next();
    } catch (err) {
      console.log(err);

      req.user = null;
      next();
    }
  }
}
