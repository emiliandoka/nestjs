import { Module } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, AuthGuard],
  exports: [LoginService],
})
export class LoginModule {}
