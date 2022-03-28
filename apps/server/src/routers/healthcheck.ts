import { Router } from 'express';

import * as controller from '../datasources/controllers/healthcheck';
const healthCheckRouter = Router();

healthCheckRouter.route('/healthcheck').get(controller.healthCheck);

export default healthCheckRouter;
