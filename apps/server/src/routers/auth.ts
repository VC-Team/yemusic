import { Router } from 'express';

import controller from '@controllers/user';

const authRouter = Router();

authRouter.route('/auth/signUp').post(controller.signUp);
authRouter.route('/auth/refreshToken').get(controller.refreshToken);
authRouter.route('/auth/sendEmailVerify').post(controller.sendEmailVerify);
authRouter.route('/auth/verifyEmail/:tokenVerifyEmail').get(controller.verifyEmail);

export default authRouter;
