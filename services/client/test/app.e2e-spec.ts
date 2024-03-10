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
    const testClient = new clientModel(clientDataExisting);
    await testClient.save();
  });

  it(`${BASE_URL}/create (POST)`, async () => {
    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(clientData)
      .expect(201);
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    // Replace ':id' with an actual ID for the client
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });

    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${client.id}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    // Replace ':id' with an actual ID for the client
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });
    const updatedClientData = {
      // Provide updated client data
      // Example: { name: 'Updated Client Name' }
    };

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${client.id}`)
      .send(updatedClientData)
      .expect(200);
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    // Replace ':id' with an actual ID for the client
    const client = await clientModel.findOne({
      company: { $eq: clientDataExisting.company },
    });

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${client.id}`)
      .expect(200);
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    // Provide valid query parameters for searching
    // Example: { name: 'Client Name' }
    const queryParams = {
      // Provide valid query parameters for searching
    };

    return request(app.getHttpServer())
      .get(`${BASE_URL}/search`)
      .query(queryParams)
      .expect(200);
  });

  it(`${BASE_URL}/list (GET)`, async () => {
    return request(app.getHttpServer()).get(`${BASE_URL}/list`).expect(200);
  });
});
