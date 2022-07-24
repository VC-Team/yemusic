import { Request, Response } from 'express';

import { jwtConfig } from '@config/index';
import { TParamsCreateToken, TParamsVerifyToken, TPayloadAccessToken } from '@interface/index';
import * as jwt from 'jsonwebtoken';

import { setCookie } from '../cookie';

export function createToken({ expiration, secretKey, payload }: TParamsCreateToken) {
  const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
  return token;
}

export function verifyToken<T = unknown>({ token, secretKey, options }: TParamsVerifyToken): jwt.JwtPayload & T {
  try {
    return jwt.verify(token, secretKey, options) as jwt.JwtPayload & T;
  } catch (error) {
    throw { errorCode: 'E-04', message: 'Token invalid!' };
  }
}

export function generateTokenForUser(req: Request, res: Response, user, isRefresh = false): string {
  const payload: TPayloadAccessToken = {
    user: { _id: user._id },
    allowedAt: new Date(),
  };

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
      path: 'user/refresh-token',
    });
  }

  return accessToken;
}
