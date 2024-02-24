import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  register(): string {
    return 'Register!';
  }
  login(): string {
    return 'Login!';
  }

  logout(): string {
    return 'Logout!';
  }
}
