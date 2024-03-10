import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
const BASE_URL = '/service/product'; // Define the BASE_URL

describe('ProductController (e2e)', () => {
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
    const productData = {
      // Provide valid product data for creation
      // Example: { name: 'Product Name', price: 99.99 }
    };

    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(productData)
      .expect(201);
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    // Replace ':id' with an actual ID for the product
    const productId = 123; // Replace 123 with an actual product ID

    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${productId}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    // Replace ':id' with an actual ID for the product
    const productId = 123; // Replace 123 with an actual product ID
    const updatedProductData = {
      // Provide updated product data
      // Example: { name: 'Updated Product Name' }
    };

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${productId}`)
      .send(updatedProductData)
      .expect(200);
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    // Replace ':id' with an actual ID for the product
    const productId = 123; // Replace 123 with an actual product ID

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${productId}`)
      .expect(200);
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    // Provide valid query parameters for searching
    // Example: { name: 'Product Name' }
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
