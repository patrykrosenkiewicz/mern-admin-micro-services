import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose';
import { userMock } from '../test/fixtures/user.fixture';
import { JwtModule } from '@nestjs/jwt';

class UserModel {
  save = jest.fn().mockResolvedValue(userMock);
  static find = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue([userMock]) });
  static findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({
      ...userMock,
      ...{
        password:
          '$2b$10$R5EfNzjbtAED4kUqEqvv3e0.NP1dPwMn1ObqGLt2iKg20bCcCKxaC',
      },
    }),
  });
  static findOneAndUpdate = jest.fn().mockResolvedValue(userMock);
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('AppController', () => {
  let appController: AppController;

  beforeAll(() => {
    process.env.JWT_SECRET = 'testJwtToken';
  });

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
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('register', () => {
    it('should return registered user', async () => {
      const registeredUser = await appController.register(userMock);
      expect(registeredUser).toStrictEqual({
        name: userMock.name,
        email: userMock.email,
      });
    });
  });

  describe('login', () => {
    it('should return user', async () => {
      const access_token = await appController.login({
        password: userMock.password,
        email: userMock.email,
      });
      expect(access_token).not.toBe('');
    });
  });

  describe('logout', () => {
    it('should return "Logout!"', () => {
      expect(appController.logout()).toBe('Logout!');
    });
  });
});
