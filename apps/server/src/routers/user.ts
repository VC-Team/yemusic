import { Router } from 'express';

import controller from '../datasources/controllers/user';

const userRouter = Router();

userRouter.route('/signUp').post(controller.signUp);

export default userRouter;
