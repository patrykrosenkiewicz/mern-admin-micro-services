import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const userMock: User = {
  name: 'test',
  email: 'test@test.com',
  password: 'qwert12345',
};
class UserModel {
  save = jest.fn().mockResolvedValue(userMock);
  static find = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue([userMock]) });
  static findOne = jest.fn().mockResolvedValue(userMock);
  static findOneAndUpdate = jest.fn().mockResolvedValue(userMock);
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('register', () => {
    it('should return registered user', async () => {
      const registeredUser = await appController.register();
      expect(registeredUser).toBe(userMock);
    });
  });

  describe('login', () => {
    it('should return user', async () => {
      const loggedInUser = await appController.login();
      expect(loggedInUser).toEqual([userMock]);
    });
  });

  describe('logout', () => {
    it('should return "Logout!"', () => {
      expect(appController.logout()).toBe('Logout!');
    });
  });
});
