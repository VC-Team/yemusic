import * as express from 'express';

import { container } from '../config';
import { validate, logErrors } from '../datasources/middleware';
import routers from '../routers';

export const loadServer = async () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(validate);
  routers(server);
  server.use(logErrors);
  const API_PORT = container.port;
  server.listen(API_PORT, () => {
    logger.info(`🔥 ${container.hostName}:${container.port}/api`);
  });
};
