import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Lead } from '../src/dto/schemas/lead.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const BASE_URL = '/service/lead';
const leadData: Lead = {
  date: new Date(),
  client: 'John Doe',
  phone: '+1234567890',
  email: 'johndoe@example.com',
  budget: '$5000',
  request: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  status: 'Pending',
};

const leadDataExisting: Lead = {
  date: new Date(2023, 5, 15), // June 15, 2023,
  client: 'John Doe EXISTS',
  phone: '+1234567890 EXISTS',
  email: 'johndoe@example.com EXISTS',
  budget: '$5000 EXISTS',
  request: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. EXISTS',
  status: 'Pending',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let leadModel: Model<Lead>;

  afterAll(async () => {
    await leadModel.deleteMany({});
    await closeInMongodConnection();
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    leadModel = moduleFixture.get<Model<Lead>>(getModelToken('Lead'));
  });

  beforeEach(async () => {
    await leadModel.deleteMany({});
  });

  it(`${BASE_URL}/create (POST)`, async () => {
    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(leadData)
      .expect(201)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();
    const lead = await leadModel.findOne({
      client: { $eq: leadDataExisting.client },
    });
    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${lead.id}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();

    const UPDATED_LEAD_CLIENT = 'updated lead client';
    const lead = await leadModel.findOne({
      client: { $eq: leadDataExisting.client },
    });

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${lead.id}`)
      .send({ client: UPDATED_LEAD_CLIENT })
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.client).toEqual(UPDATED_LEAD_CLIENT);
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();
    const testLead2 = new leadModel(leadData);
    await testLead2.save();
    const lead = await leadModel.findOne({
      client: { $eq: leadDataExisting.client },
    });

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${lead.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.client).toEqual(leadDataExisting.client);
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();
    const testLead2 = new leadModel(leadData);
    await testLead2.save();

    const queryParams = {
      fields: 'client',
      q: 'John Doe EXISTS',
    };

    return request(app.getHttpServer())
      .get(`${BASE_URL}/search`)
      .query(queryParams)
      .expect(200)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
        expect(body.result.length).toEqual(1);
        expect(body.result[0].client).toEqual(leadDataExisting.client);
      });
  });

  it(`${BASE_URL}/search not existing lead (GET)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();
    const testLead2 = new leadModel(leadData);
    await testLead2.save();
    const queryParams = {
      fields: 'name,lead,surname',
      q: '12312321321312321321',
    };

    return request(app.getHttpServer())
      .get(`${BASE_URL}/search`)
      .query(queryParams)
      .expect(200)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
        expect(body.result.length).toEqual(0);
      });
  });

  it(`${BASE_URL}/list (GET)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();

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
        expect(body.result[0].client).toEqual(leadDataExisting.client);
      });
  });

  it(`${BASE_URL}/list not existing page (GET)`, async () => {
    const testLead = new leadModel(leadDataExisting);
    await testLead.save();

    return request(app.getHttpServer())
      .get(`${BASE_URL}/list?page=3`)
      .expect(({ body }) => {
        expect(body.result.length).toEqual(0);
      });
  });
});
