import { Request, Response } from 'express';

import { jwtConfig } from '@config';
import { User } from '@model/user';
import { yeToken } from '@utils/controllers';
import { useHttpHandler } from '@utils/useHttpHandler';

export const getUser = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.headers.authorization;
  const user = yeToken.verifyToken({ token, secretKey: jwtConfig.secretAccessToken });

  if (!user['userId']._id) {
    throw {
      errorCode: 'E-04',
      message: 'Token not exists.',
    };
  }
  const results = await User.findById(user['userId']._id).select('-password').lean();

  return res.status(200).json({
    data: results,
  });
});
