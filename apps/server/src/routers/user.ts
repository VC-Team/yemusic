import { Router } from 'express';

import controller from '@controllers/user';

const userRouter = Router();

userRouter.route('/user').get(controller.getUser);

export default userRouter;
