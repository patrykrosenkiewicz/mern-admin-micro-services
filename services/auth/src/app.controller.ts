import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createUserSchema } from './dto/validators/create-user.validator';
import { LoginBody } from './types/login-body.type';
import { loginUserSchema } from './dto/validators/login-user.validator';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() createUserDto: CreateUserDto): Promise<{
    name: string;
    email: string;
  }> {
    return this.appService.register(createUserDto);
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  login(@Body() loginBody: LoginBody): Promise<{ access_token: string }> {
    return this.appService.login(loginBody);
  }

  @Post('/logout')
  logout(): string {
    return this.appService.logout();
  }
  @Get('/')
  alive(): string {
    return 'ALIVE';
  }
}
