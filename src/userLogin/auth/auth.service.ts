import { Injectable } from '@nestjs/common';
import { LoginService } from '../login.service';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: LoginService) {}

  async validateUser(userfromPost): Promise<any> {
    const user = await this.usersService.findOne(userfromPost.email);
    console.log(user);
    bcrypt.compare(userfromPost.pass, user.password, function (err, result) {
      if (user && result === true) {
        const { password, ...result } = user;
        return result;
      }
    });
    return null;
  }
}
