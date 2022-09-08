import { createUserDto } from './dto/createUser.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(createUserDto) {}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  async createUser(createUserDto: createUserDto) {
    try {
      /* eslint-disable */
      const users = await this.knex.table("users").insert({
        "email": createUserDto.email,
        "image": createUserDto.image,
        "bio": createUserDto.bio,
        "password": await hash(createUserDto.password, 10) ,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findAll() : Promise<any> {
    const users = await this.knex.table('users');
    return { users };
  }
}
