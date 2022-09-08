import { user } from './login.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class LoginService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findOne(userfrontend): Promise<user | undefined> {
    try {
      const user: any = await this.knex('users')
        .where({
          email: userfrontend.email,
        })
        .select('id', 'email', 'bio', 'image', 'created_at');
      // const value = await compare(userfrontend.password, user.password);
      // console.log(value);

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findById(id: number): Promise<user | any> {
    const user: any = await this.knex('users')
      .where({
        id: id,
      })
      .select('id', 'email', 'bio', 'image', 'created_at');
    return user;
  }
  generateJwt(user): string {
    console.log(user);

    return sign(
      {
        id: user[0].id,
        email: user[0].email,
      },
      process.env.JWT_SECRET,
    );
  }
  builduserResponse(user: user): any {
    console.log(user);

    return {
      ...user[0],
      token: this.generateJwt(user),
    };
  }
}
