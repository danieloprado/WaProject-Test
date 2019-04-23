import 'app-module-path/register';
import 'source-map-support';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExceptionFilter } from 'filters/exception';
import { ApplicationModule } from 'modules';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(3001);
}

bootstrap();
