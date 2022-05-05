import * as express from 'express';

import { container } from '@config';

import { validate, logErrors } from '../datasources/middleware';
import routers from '../routers';

export const createServer = () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(validate);
  routers(server);
  server.use(logErrors);
  return server;
};

export const loadServer = () => {
  const API_PORT = container.port;
  const app = createServer();

  app.listen(API_PORT, () => {
    logger.info(`🔥 ${container.hostName}:${container.port}/api`);
  });
};
