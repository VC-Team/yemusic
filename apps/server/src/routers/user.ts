import { Router } from 'express';

import controller from '@controllers/user';

const userRouter = Router();

userRouter.route('/user/sign-up').post(controller.signUp);
userRouter.route('/user/sign-in').post(controller.signIn);
userRouter.route('/user/refresh-token').post(controller.refreshToken);
userRouter.route('/user/send-email-verify').post(controller.sendEmailVerify);
userRouter.route('/user/verify-email/:tokenVerifyEmail').get(controller.verifyEmail);

export default userRouter;
