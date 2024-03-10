import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';
import { userMock, userMockLoginTest } from './fixtures/user.fixture';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

let app: INestApplication;

describe('AppController (e2e)', () => {
  let userModel: Model<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userModel = moduleFixture.get<Model<User>>(getModelToken('User'));
    const testUser = new userModel({
      ...userMockLoginTest,
      ...{ password: await bcrypt.hash(userMockLoginTest.password, 10) },
    });
    await testUser.save();
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await closeInMongodConnection();
    await app.close();
  });

  it('Tests register flow', () => {
    return request(app.getHttpServer())
      .post('/service/auth/register')
      .send(userMock)
      .expect(201)
      .expect({ name: userMock.name, email: userMock.email });
  });

  it('Tests login flow', () => {
    return request(app.getHttpServer())
      .post('/service/auth/login')
      .send({
        email: userMockLoginTest.email,
        password: userMockLoginTest.password,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.result.token).not.toEqual('');
        expect(body.result.admin.isLoggedIn).toEqual(true);
      });
  });
});
