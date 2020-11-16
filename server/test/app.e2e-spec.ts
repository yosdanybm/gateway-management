import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('GatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('findAll Gateways (GET)', () => {
    return request(app.getHttpServer())
      .get('/gateway/findAll')
      .expect(200);
  });

  it('findBy Id Gateways (GET)', () => {
    return request(app.getHttpServer())
      .get('/gateway/5fb03043ce41c2554cd2e0ec')
      .expect(200);
  });

  it('throws error if API cannot find Gateway (GET)', () => {
    return request(app.getHttpServer())
      .get('/gateway/5f8cac4163f17057dc7d0f04')
      .expect(404);
  });

  it('throws error if API cannot delete Gateway (GET)', () => {
    return request(app.getHttpServer())
      .delete('/gateway/5f8cac4163f17057dc7d0f04')
      .expect(404);
  });

  it('findAll Devices (GET)', () => {
    return request(app.getHttpServer())
      .get('/device/findAll')
      .expect(200);
  });

  it('findBy Id Devices (GET)', () => {
    return request(app.getHttpServer())
      .get('/device/5f96081337168121944933dc')
      .expect(200);
  });

  it('throws error if API cannot find Device (GET)', () => {
    return request(app.getHttpServer())
      .get('/device/5f8cac4163f17057dc7d0f04')
      .expect(404);
  });

  it('throws error if API cannot delete Device (GET)', () => {
    return request(app.getHttpServer())
      .delete('/device/5f8cac4163f17057dc7d0f04')
      .expect(404);
  });
});
