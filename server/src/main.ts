import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ErrorsInterceptor } from './common/interceptors/exception.interceptor';
import { RedocOptions, RedocModule } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new ErrorsInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Managing Gateways')
    .setDescription('The managing gateways API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const redocOptions: RedocOptions = {
    title: 'Docs API Gateways',
    logo: {
      url: 'https://redocly.github.io/redoc/petstore-logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'PetStore logo'
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    expandResponses: 'all',
    hideLoading: false,
  };
  // Instead of using SwaggerModule.setup() you call this module
  await RedocModule.setup('/api-docs', app, document, redocOptions);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
