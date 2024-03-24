import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Product } from '../src/dto/schemas/product.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './test-utils/mongo/MongooseTestModule';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const BASE_URL = '/service/product';
const productData: Product = {
  enabled: true,
  productName: 'Sample Product',
  description: 'This is a sample product description.',
  price: '10.99',
  status: 'available',
};

const productDataExisting: Product = {
  enabled: true,
  productName: 'Sample Product EXISTING',
  description: 'This is a sample product description.',
  price: '10.99',
  status: 'available',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let productModel: Model<Product>;

  afterAll(async () => {
    await productModel.deleteMany({});
    await closeInMongodConnection();
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    productModel = moduleFixture.get<Model<Product>>(getModelToken('Product'));
  });

  beforeEach(async () => {
    await productModel.deleteMany({});
  });

  it(`${BASE_URL}/create (POST)`, async () => {
    return request(app.getHttpServer())
      .post(`${BASE_URL}/create`)
      .send(productData)
      .expect(201)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/read/:id (GET)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();
    const product = await productModel.findOne({
      productName: { $eq: productDataExisting.productName },
    });
    return request(app.getHttpServer())
      .get(`${BASE_URL}/read/${product.id}`)
      .expect(200);
  });

  it(`${BASE_URL}/update/:id (PATCH)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();

    const UPDATED_LEAD_CLIENT = 'updated product name';
    const product = await productModel.findOne({
      productName: { $eq: productDataExisting.productName },
    });

    return request(app.getHttpServer())
      .patch(`${BASE_URL}/update/${product.id}`)
      .send({ productName: UPDATED_LEAD_CLIENT })
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.productName).toEqual(UPDATED_LEAD_CLIENT);
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/delete/:id (DELETE)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();
    const testLead2 = new productModel(productData);
    await testLead2.save();
    const product = await productModel.findOne({
      productName: { $eq: productDataExisting.productName },
    });

    return request(app.getHttpServer())
      .delete(`${BASE_URL}/delete/${product.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.result.productName).toEqual(
          productDataExisting.productName,
        );
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
      });
  });

  it(`${BASE_URL}/search (GET)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();
    const testLead2 = new productModel(productData);
    await testLead2.save();

    const queryParams = {
      fields: 'productName',
      q: 'EXISTING',
    };

    return request(app.getHttpServer())
      .get(`${BASE_URL}/search`)
      .query(queryParams)
      .expect(200)
      .expect(({ body }) => {
        expect(Object.keys(body)).toEqual(['result', 'message', 'success']);
        expect(body.result.length).toEqual(1);
        expect(body.result[0].productName).toEqual(
          productDataExisting.productName,
        );
      });
  });

  it(`${BASE_URL}/search not existing product (GET)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();
    const testLead2 = new productModel(productData);
    await testLead2.save();
    const queryParams = {
      fields: 'productName',
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
    const testLead = new productModel(productDataExisting);
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
        expect(body.result[0].productName).toEqual(
          productDataExisting.productName,
        );
      });
  });

  it(`${BASE_URL}/list not existing page (GET)`, async () => {
    const testLead = new productModel(productDataExisting);
    await testLead.save();

    return request(app.getHttpServer())
      .get(`${BASE_URL}/list?page=3`)
      .expect(({ body }) => {
        expect(body.result.length).toEqual(0);
      });
  });
});
