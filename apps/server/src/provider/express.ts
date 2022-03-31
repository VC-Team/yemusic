import * as express from 'express';

import { container } from '../config';
import routers from '../routers';

export const loadServer = async () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  routers(server);
  const API_PORT = container.port;
  server.listen(API_PORT, () => {
    logger.info(`🔥 ${container.hostName}:${container.port}/api`);
  });
};
