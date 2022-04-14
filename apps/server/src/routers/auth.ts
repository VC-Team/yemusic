import { Router } from 'express';

import controller from '../datasources/controllers/auth';

const authRouter = Router();

authRouter.route('/auth/signUp').post(controller.signUp);
authRouter.route('/auth/verifyEmail/:tokenVerifyEmail').get(controller.verifyEmail);

export default authRouter;
