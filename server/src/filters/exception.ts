import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as sentry from '@sentry/node';
import { Request } from 'express-serve-static-core';
import { BUILD_DATE, BUILD_NUMBER, NODE_ENV, SENTRY_DSN } from 'settings';

sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  release: BUILD_NUMBER,
  tags: {
    environment: NODE_ENV,
    version: BUILD_NUMBER,
    versionDate: BUILD_DATE
  }
});

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      exception.errorData = {
        req: {
          method: request.method,
          url: request.originalUrl,
          queryString: request.params,
          body: request.body,
        }
      };
      sentry.captureException(exception);
    }

    super.catch(exception, host);
  }
}