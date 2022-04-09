import { Router } from 'express';

import controller from '../datasources/controllers/auth';

const authRouter = Router();

authRouter.route('/auth/sign-up').post(controller.signUp);

export default authRouter;
