import { Request, Response } from 'express';

import { jwtConfig } from '@config';
import { TParamsCreateToken, TParamsVerifyToken } from '@utils/interface';
import * as jwt from 'jsonwebtoken';

import { setCookie } from '../../cookie';

export function createToken({ expiration, secretKey, payload }: TParamsCreateToken) {
  const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
  return token;
}

export function verifyToken({ token, secretKey, options }: TParamsVerifyToken): string | jwt.JwtPayload {
  const decoded = jwt.verify(token, secretKey, options);

  return decoded;
}

export function generateTokenForUser(req: Request, res: Response, userId, isRefresh = false): string {
  const payload = { userId, allowedAt: new Date() };
  const accessToken = createToken({
    expiration: jwtConfig.accessTokenExpiration,
    secretKey: jwtConfig.secretAccessToken,
    payload,
  });

  if (isRefresh) {
    const refreshToken = createToken({
      expiration: jwtConfig.refreshTokenExpiration,
      secretKey: jwtConfig.secretRefreshToken,
      payload,
    });

    setCookie(req, res, {
      key: 'refreshToken',
      value: refreshToken,
      path: 'auth/refreshToken',
    });
  }

  return accessToken;
}
