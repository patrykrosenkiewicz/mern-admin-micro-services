import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/service/admin/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/service/admin/create')
      .expect(201);
  });

  it('/service/admin/read/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/service/admin/read/:id')
      .expect(200);
  });

  it('/service/admin/update/:id (PATCH', () => {
    return request(app.getHttpServer())
      .patch('/service/admin/update/:id')
      .expect(200);
  });

  it('/service/admin/delete/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/service/admin/delete/:id')
      .expect(200);
  });

  it('/service/admin/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/service/admin/search')
      .expect(200);
  });

  it('/service/admin (GET)', () => {
    return request(app.getHttpServer()).get('/service/admin').expect(200);
  });
});
