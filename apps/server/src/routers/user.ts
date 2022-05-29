import { Router } from 'express';

import controller from '@controllers/user';

const userRouter = Router();

userRouter.route('/user/signUp').post(controller.signUp);
userRouter.route('/user/refreshToken').post(controller.refreshToken);
userRouter.route('/user/sendEmailVerify').post(controller.sendEmailVerify);
userRouter.route('/user/verifyEmail/:tokenVerifyEmail').get(controller.verifyEmail);
userRouter.route('/user/signIn').post(controller.signIn);

export default userRouter;
