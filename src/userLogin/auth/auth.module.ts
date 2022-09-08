import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginModule } from '../login.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [LoginModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
