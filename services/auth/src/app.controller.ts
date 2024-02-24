import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(): string {
    return this.appService.register();
  }

  @Post('/login')
  login(): string {
    return this.appService.login();
  }

  @Post('/logout')
  logout(): string {
    return this.appService.logout();
  }
}
