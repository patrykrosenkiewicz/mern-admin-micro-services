import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Client } from '../src/dto/schemas/client.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const BASE_URL = '/service/client';
const clientData: Client = {
  enabled: 'true',
  company: 'Mock Company',
  name: 'Mock Name',
  surname: 'Mock Surname',
  bankAccount: 'Mock Bank Account',
  companyRegNumber: 'Mock Company Reg Number',
  companyTaxNumber: 'Mock Company Tax Number',
  companyTaxID: 'Mock Company Tax ID',
  customField: {
    fieldName: 'customName',
    fieldValue: 'customValue',
  },
  address: 'Mock Address',
  country: 'Mock Country',
  phone: 'Mock Phone',
  email: 'mock@example.com',
  website: 'http://www.mockwebsite.com',
};

const clientDataExisting: Client = {
  enabled: 'true',
  company: 'Mock Company EXISTS',
  name: 'Mock Name EXISTS',
  surname: 'Mock Surname EXISTS',
  bankAccount: 'Mock Bank Account EXISTS',
  companyRegNumber: 'Mock Company Reg Number EXISTS',
  companyTaxNumber: 'Mock Company Tax Number EXISTS',
  companyTaxID: 'Mock Company Tax ID EXISTS',
  customField: {
    fieldName: 'customName EXISTS',
    fieldValue: 'customValue EXISTS',
  },
  address: 'Mock Address EXISTS',
  country: 'Mock Country EXISTS',
  phone: 'Mock Phone EXISTS',
  email: 'mock@example.com EXISTS',
  website: 'http://www.mockwebsite.com EXISTS',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let clientModel: Model<Client>;

  afterAll(async () => {
    await clientModel.deleteMany({});
    await closeInMongodConnection();
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    clientModel = moduleFixture.get<Model<Client>>(getModelToken('Client'));
  });

  beforeEach(async () => {
    await clientModel.deleteMany({});
  });

  it(`${BASE_URL}/create (POST)`, async () => {
    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(clientData)
      .expect(201)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });

    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${client.id}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();

    const UPDATED_CLIENT_NAME = 'updated client name';
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${client.id}`)
      .send({ name: UPDATED_CLIENT_NAME })
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.name).toEqual(UPDATED_CLIENT_NAME);
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();
    const testClient2 = new clientModel(clientData);
    await testClient2.save();
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${client.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.name).toEqual(clientDataExisting.name);
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();
    const testClient2 = new clientModel(clientData);
    await testClient2.save();
    const queryParams = {
      name: clientDataExisting.name,
      company: clientDataExisting.company,
    };

    return request(app.getHttpServer())
      .get(`${BASE_URL}/search`)
      .query(queryParams)
      .expect(200)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
        expect(body.result.length).toEqual(1);
        expect(body.result[0].name).toEqual(clientDataExisting.name);
      });
  });

  it(`${BASE_URL}/list (GET)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();

    return request(app.getHttpServer())
      .get(`${BASE_URL}/list`)
      .expect(200)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual([
          'result',
          'pagination',
          'message',
          'success',
        ]);
        expect(Object.keys(body.pagination)).toEqual([
          'page',
          'pages',
          'count',
        ]);
        expect(body.result.length).toEqual(1);
        expect(body.result[0].name).toEqual(clientDataExisting.name);
      });
  });

  it(`${BASE_URL}/list not existing page (GET)`, async () => {
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();

    return request(app.getHttpServer())
      .get(`${BASE_URL}/list?page=3`)
      .expect(({ body }) => {
        expect(body.result.length).toEqual(0);
      });
  });
});
