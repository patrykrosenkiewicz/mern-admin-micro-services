import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  register(): Promise<User> {
    return this.appService.register();
  }

  @Post('/login')
  login(): Promise<User[]> {
    return this.appService.login();
  }

  @Post('/logout')
  logout(): string {
    return this.appService.logout();
  }
}
