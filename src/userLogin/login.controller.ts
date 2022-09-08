import { Post, Body, Controller, Get, Req } from '@nestjs/common';
import { user } from './login.entity';
import { LoginService } from './login.service';
type LginDataFromUser = {
  emaill: string;
  pass: string;
};
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('login')
  async loginUser(@Body() user: LginDataFromUser): Promise<user> {
    const fulluserData: any = await this.loginService.findOne(user);
    return await this.loginService.builduserResponse(fulluserData);
  }

  @Get('login')
  async currentUser(@Req() request: Request): Promise<any> {
    return 'this.currentUser' as any;
  }
}
