import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';

let app: INestApplication;

afterAll(async () => {
  await closeInMongodConnection();
});

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, rootMongooseTestModule()],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('AppController (e2e)', () => {
  beforeEach(async () => {});

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer()).post('/login').expect(201).expect([]);
  });
});
