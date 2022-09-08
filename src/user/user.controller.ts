import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: createUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('users')
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }
}
