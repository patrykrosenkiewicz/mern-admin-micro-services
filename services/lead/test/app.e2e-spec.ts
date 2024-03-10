import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
const BASE_URL = '/service/lead'; // Define the BASE_URL

describe('LeadController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it(`${BASE_URL}/create (POST)`, async () => {
    const leadData = {
      // Provide valid lead data for creation
      // Example: { name: 'Lead Name', email: 'lead@example.com' }
    };

    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(leadData)
      .expect(201);
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    // Replace ':id' with an actual ID for the lead
    const leadId = 123; // Replace 123 with an actual lead ID

    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${leadId}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    // Replace ':id' with an actual ID for the lead
    const leadId = 123; // Replace 123 with an actual lead ID
    const updatedLeadData = {
      // Provide updated lead data
      // Example: { name: 'Updated Lead Name' }
    };

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${leadId}`)
      .send(updatedLeadData)
      .expect(200);
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    // Replace ':id' with an actual ID for the lead
    const leadId = 123; // Replace 123 with an actual lead ID

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${leadId}`)
      .expect(200);
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    // Provide valid query parameters for searching
    // Example: { name: 'Lead Name' }
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
