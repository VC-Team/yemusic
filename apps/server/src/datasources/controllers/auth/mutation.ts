import { NextFunction, Request, Response } from 'express';

import { refreshTokenExpires } from '../../../config';
import { TSignUpInput } from '../../interface';
import { User } from '../../models';
import { authUtils } from '../../utils/controllers';
import { yeToken } from '../../utils/controllers';
import sendMail from '../../utils/controllers/nodemailer';

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email, password }: TSignUpInput = req.body;

    /* It's checking if the email already exists in the database. */
    const emailExists = await User.exists({ email });
    if (emailExists) throw { errorCode: 'E-04', message: 'Email already exists' };

    /* It's hashing the password with a salt of 10. */
    const hashPassword = authUtils.generateHash(password, 10);

    /* It's creating a new user in the database. */
    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    if (!newUser) throw { errorCode: 'E-04', message: 'An error occurred while creating new user' };

    const userResponse = await User.findOne({ email }).select('-password');

    res.status(200).json({
      isSuccess: true,
      data: userResponse,
    });

    const tokenVerifyEmail = yeToken.createToken({ payload: { email } });

    const verifyURL = `${req.protocol}://${req.get('host')}/api/auth/verifyEmail/${tokenVerifyEmail}`;
    sendMail({
      to: email,
      subject: 'Verify your email to complete sign up Yemusic',
      html: `
        <b>Just one more step to complete the registration 🥳</b>
        <div>
          <a href="${verifyURL}" target="_blank">Click this link to complete</a>
        </div>
        `,
    });

    return;
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const errorResponse = {
    errorCode: 'E-04',
    message: 'Verify email failed',
  };
  try {
    const { tokenVerifyEmail } = req.params;

    if (!tokenVerifyEmail) throw errorResponse;

    /* It's verifying the token and returning the payload. */
    const verifyInfo = yeToken.verifyToken({ token: tokenVerifyEmail });

    if (!verifyInfo['email']) throw errorResponse;

    /* It's updating the user and then finding the user again. */
    let user = await User.findOne({ email: verifyInfo['email'] });
    if (!user) throw { errorCode: 'E-04', message: 'An error occurred while verify email user.' };

    const email = verifyInfo['email'];

    /* It's creating a token and a refresh token. */
    const token = yeToken.createToken({ payload: { email } });
    const refreshToken = yeToken.createToken({
      expiration: parseInt(process.env.JWT_REFRESH_EXPIRATION),
      payload: { email },
    });

    user = await User.updateMany({
      isValidEmail: true,
      token,
      refreshToken,
      refreshTokenExpires,
    });

    const userResponse = await User.findOne({ email });

    return res.status(200).json({
      isSuccess: true,
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
}
