import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { ExpressRequest } from 'types/expressRequest.interface';
import { AuthGuard } from 'src/userLogin/guard/auth.guard';

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

  @Put('users')
  @UseGuards(AuthGuard)
  async UpdateUsers(
    @Body() dataToUpdate: any,
    @Req() req: ExpressRequest,
  ): Promise<any> {
    return this.usersService.updateUser(dataToUpdate, req);
  }
}
