import { Request, Response } from 'express';

import { TSignUpInput } from '@interface/user';
import { useHttpHandler } from '@utils/useHttpHandler';

import { refreshTokenExpires, jwtConfig } from '../../../config';
import { User } from '../../models';
import { authUtils } from '../../utils/controllers';
import { yeToken } from '../../utils/controllers';
import { nodemailer } from '../../utils/controllers/nodemailer';

export const signUp = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email, password, displayName }: TSignUpInput = req.body;

  /* It's checking if the email already exists in the database. */
  const emailExists = await User.exists({ email });
  if (emailExists) throw { errorCode: 'E-04', message: 'Email already exists.' };

  /* It's hashing the password with a salt of 10. */
  const hashPassword = authUtils.generateHash(password, 10);

  /* It's creating a new user in the database. */
  const newUser = await User.create({
    email,
    'info.displayName': displayName,
    password: hashPassword,
  });

  if (!newUser) throw { errorCode: 'E-04', message: 'An error occurred while creating new user.' };

  const userResponse = JSON.parse(JSON.stringify(newUser));
  delete userResponse.password;

  res.status(200).json({ data: userResponse });

  /* It's sending an email to the user with a link to verify the email. */
  nodemailer.sendEmailVerify(req, email);

  return;
});

export const sendEmailVerify = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw { errorCode: 'E-04', message: 'Cannot find the user using this email.' };

  /* It's sending an email to the user with a link to verify the email. */
  const info = await nodemailer.sendEmailVerify(req, email);

  if (!info.messageId) throw { errorCode: 'E-04', message: 'Send email failed.' };

  return res.status(200).json();
});

export const verifyEmail = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
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
});
