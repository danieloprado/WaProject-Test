import 'app-module-path/register';
import 'source-map-support';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { ExceptionFilter } from './filters/exception';
import { AppModule } from './modules/app/module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(3000);
}

bootstrap();
