import { Router } from 'express';

import { healthCheck } from '@controllers/healthcheck';
const healthCheckRouter = Router();

healthCheckRouter.route('/healthcheck').get(healthCheck);

export default healthCheckRouter;
