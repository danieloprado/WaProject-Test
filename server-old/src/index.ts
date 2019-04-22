import 'app-module-path/register';
import 'source-map-support/register';

import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import express from 'express';
import allowCors from 'middlewares/allowCors';
import notFound from 'middlewares/notFound';
import logger from 'morgan';
import { env, isDevelopment, isProduction } from 'settings';

const app = express();

app.disable('etag');

if (isProduction) {
  app.use(timeout('5s'));
}

if (isDevelopment) {
  app.use(logger('dev'));
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCors);

app.use(notFound);

console.log(`starting server: PORT: 3000 | ENV: ${env}`);
app.listen(3000, () => console.log(`server started: PORT: 3000 | ENV: ${env}`));
process.on('unhandledRejection', (reason: any, p: any) => { /* ignore */ });