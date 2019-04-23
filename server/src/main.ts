import 'app-module-path/register';
import 'source-map-support';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionFilter } from 'filters/exception';
import { ApplicationModule } from 'modules';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true
  }));
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Ebay Email Api Seach')
    .setDescription('WaProject Ebay Email')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3001);
}

bootstrap();
