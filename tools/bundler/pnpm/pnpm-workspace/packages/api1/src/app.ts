'use strict';

import Koa = require('koa');
const app = new Koa();
import helmet = require('koa-helmet');
import jwt = require('koa-jwt');
import bodyParser = require('koa-bodyparser');

import { router } from './routes';
import { JWT_SECRET, HOST, PORT } from './config';
import { defaultLogger, logger } from './services/logger';

app
  .use(helmet())
  .use(bodyParser())
  .use(jwt({ secret: JWT_SECRET })
    .unless({ path: [/^\/auth/, /^\/public/, /^\/favicon/, /^\//, /^\/check/] }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(defaultLogger)
  .on('error', (err, ctx) => {
    if (ctx) {
      logger.error(`[${err}] - ${ctx.href}`);
    } else {
      logger.error(`[${err}]`);
    }
  })

async function main() {
  try {
    await import('./services/database').then(res => res.default);
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, HOST, () => {
    logger.info(`Server Ready at [${HOST}:${PORT}] - ${new Date().toUTCString()}`);
  });
}

process
  .on('unhandledRejection', (reason, promise) => {
    promise.catch(err => {
      logger.error(`Unhandled Promise: [${reason}]: ${err.stack}`);
    });
  });



main();