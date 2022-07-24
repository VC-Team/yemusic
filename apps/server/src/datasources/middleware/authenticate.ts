import { Request, Response, NextFunction } from 'express';

import { routerConfig, jwtConfig } from '@config/index';
import { TPayloadAccessToken } from '@interface/index';
import { yeToken } from '@utils/controllers';

type Tuser = { _id: string };

export type AuthorizedReqest = Request & {
  user: Tuser;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')?.[1];

  const isAuthenticate = routerConfig[req.route.path]?.private ?? true;
  if (!isAuthenticate) return;

  const payload = yeToken.verifyToken<TPayloadAccessToken>({ token, secretKey: jwtConfig.secretAccessToken });
  (req as AuthorizedReqest).user = payload.user;
};
