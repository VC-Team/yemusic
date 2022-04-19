import { NextFunction, Request, Response } from 'express';

import { refreshTokenExpires, jwtConfig } from '../../../config';
import { TSignUpInput } from '../../interface';
import { User } from '../../models';
import { authUtils } from '../../utils/controllers';
import { yeToken } from '../../utils/controllers';
import { nodemailer } from '../../utils/controllers/nodemailer';

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email, password }: TSignUpInput = req.body;

    /* It's checking if the email already exists in the database. */
    const emailExists = await User.exists({ email });
    if (emailExists) throw { errorCode: 'E-04', message: 'Email already exists.' };

    /* It's hashing the password with a salt of 10. */
    const hashPassword = authUtils.generateHash(password, 10);

    /* It's creating a new user in the database. */
    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    if (!newUser) throw { errorCode: 'E-04', message: 'An error occurred while creating new user.' };

    const userResponse = JSON.parse(JSON.stringify(newUser));
    delete userResponse.password;

    res.status(200).json({ data: userResponse });

    /* It's sending an email to the user with a link to verify the email. */
    nodemailer.sendEmailVerify(req, email);

    return;
  } catch (error) {
    next(error);
  }
}

export async function sendEmailVerify(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw { errorCode: 'E-04', message: 'Cannot find the user using this email.' };

    /* It's sending an email to the user with a link to verify the email. */
    const info = await nodemailer.sendEmailVerify(req, email);

    if (!info.messageId) throw { errorCode: 'E-04', message: 'Send email failed.' };

    // TODO: return data user(-password)
    return res.status(200);
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { tokenVerifyEmail } = req.params;

    /* It's verifying the token and returning the payload. */
    const verifyInfo = yeToken.verifyToken({ token: tokenVerifyEmail });

    if (!verifyInfo['email']) throw { errorCode: 'E-01', message: 'Email verification link is not correct.' };

    const user = await User.findOne({ email: verifyInfo['email'] });
    if (!user) throw { errorCode: 'E-04', message: 'Cannot find the user using this email.' };

    const email = verifyInfo['email'];

    /* It's creating a token and a refresh token. */
    const token = yeToken.createToken({ payload: { email } });
    const refreshToken = yeToken.createToken({
      expiration: jwtConfig.refresh_expiration,
      payload: { email },
    });

    const updatedUser = await User.findOneAndUpdate({
      isValidEmail: true,
      token,
      refreshToken,
      refreshTokenExpires,
    });

    const userResponse = JSON.parse(JSON.stringify(updatedUser));
    delete userResponse.password;

    res.status(200).json({ data: userResponse });

    return;
  } catch (error) {
    next(error);
  }
}
