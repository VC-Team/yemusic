import { NextFunction, Request, Response } from 'express';

import { SignUpInput } from '../../interface';
import { User } from '../../models';
import { authUtils } from '../../utils/controllers/auth';
import { yeToken } from '../../utils/controllers/token';

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email, password }: SignUpInput = req.body;

    /* It's creating a token and a refresh token. */
    const token = yeToken.createToken({ payload: { email } });
    const refreshToken = yeToken.createToken({
      expiration: parseInt(process.env.JWT_REFRESH_EXPIRATION),
      payload: { email },
    });

    /* It's creating a date 10 days from now. */
    const refreshTokenExpires = Date.now() + 24 * 60 * 60 * 10000;

    /* It's hashing the password with a salt of 10. */
    const hashPassword = await authUtils.generateHash(password, 10);

    /* It's creating a new user in the database. */
    const newUser = await User.create({
      email,
      password: hashPassword,
      token,
      refreshToken,
      refreshTokenExpires,
    });

    if (!newUser) {
      return res.status(400).json({
        isSuccess: false,
        message: 'An error occurred while creating new user',
      });
    }

    return res.status(200).json({
      isSuccess: true,
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({
      isSuccess: false,
      message: JSON.stringify(error),
    });
  }
}
