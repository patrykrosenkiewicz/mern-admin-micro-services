import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('register', () => {
    it('should return "Register!"', () => {
      expect(appController.register()).toBe('Register!');
    });
  });

  describe('login', () => {
    it('should return "Login!"', () => {
      expect(appController.login()).toBe('Login!');
    });
  });

  describe('logout', () => {
    it('should return "Logout!"', () => {
      expect(appController.logout()).toBe('Logout!');
    });
  });
});
