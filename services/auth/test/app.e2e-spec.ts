import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';
import { userMock } from './fixtures/user.fixture';

let app: INestApplication;

afterAll(async () => {
  await closeInMongodConnection();
});

afterEach(async () => {
  await app.close();
});

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, rootMongooseTestModule()],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('AppController (e2e)', () => {
  beforeEach(async () => {});

  it('Tests register flow', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(userMock)
      .expect(201)
      .expect({ name: userMock.name, email: userMock.email });
  });
});
