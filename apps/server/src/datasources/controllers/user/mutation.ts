import { Request, Response } from 'express';

import { jwtConfig } from '@config';
import { TSignUpInput, TPlayList } from '@interface/index';
import { yeToken, auth, nodemailer } from '@utils/controllers';
import { useHttpHandler } from '@utils/useHttpHandler';

import { User, PlayList } from '../../models';

/*
TODO: set user info into the Redis
 */

export const signUp = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email, password, displayName }: TSignUpInput = req.body;

  const emailExists = await User.exists({ email });
  if (emailExists) {
    throw {
      errorCode: 'E-04',
      message: 'Email already exists.',
    };
  }

  const hashPassword = auth.generateHash(password, 10);
  const newUser = await User.create({
    email,
    'info.displayName': displayName,
    password: hashPassword,
  });

  if (!newUser) {
    throw {
      errorCode: 'E-04',
      message: 'An error occurred while creating new user.',
    };
  }

  const userResponse = newUser.toObject();
  delete userResponse.password;

  // generate Token
  const accessToken = yeToken.generateTokenForUser(req, res, userResponse, true);

  res.status(200).json({ data: { me: userResponse, accessToken } });

  const likedTrack: TPlayList = {
    name: 'Liked tracks',
    isLikedTrack: true,
    owner: userResponse._id,
  };
  await Promise.all([nodemailer.sendEmailVerify(req, userResponse), PlayList.create(likedTrack)]);

  return;
});

export const refreshToken = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.cookies;

  const user = yeToken.verifyToken({ token: refreshToken, secretKey: jwtConfig.secretRefreshToken });

  if (!refreshToken) {
    throw {
      errorCode: 'E-02',
      message: 'Refresh token invalid!',
    };
  }
  const accessToken = yeToken.generateTokenForUser(req, res, user['userId']);

  return res.status(200).json({ data: { accessToken } });
});

export const sendEmailVerify = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select('_id email').lean();
  if (!user) {
    throw {
      errorCode: 'E-04',
      message: 'Cannot find the user using this email.',
    };
  }

  const info = await nodemailer.sendEmailVerify(req, user);
  if (!info.messageId) {
    throw {
      errorCode: 'E-04',
      message: 'Send email failed.',
    };
  }

  return res.status(200).json();
});

export const verifyEmail = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { tokenVerifyEmail } = req.params;

  const verifyInfo = yeToken.verifyToken({
    token: tokenVerifyEmail,
    secretKey: jwtConfig.secretAccessToken,
  });

  if (!verifyInfo['_id']) {
    throw {
      errorCode: 'E-01',
      message: 'Email verification link is not correct.',
    };
  }

  const user = await User.findOne({
    _id: verifyInfo['_id'],
    isValidEmail: false,
  })
    .select('_id')
    .lean();

  if (!user) {
    throw {
      errorCode: 'E-04',
      message: 'Cannot find the user using this email.',
    };
  }

  await User.updateOne({ _id: user._id }, { isValidEmail: true });

  return res.status(200).json();
});

export const signIn = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: { email: string; password: string } = req.body;

  const currentUser = await User.findOne({ email }).lean();
  const compareHash = auth.compareHash(password, currentUser?.password);

  if (!currentUser || !compareHash)
    throw {
      errorCode: 'E-05',
      message: 'Email or Password is not correct, please try again!',
    };

  delete currentUser.password;
  const accessToken = yeToken.generateTokenForUser(req, res, currentUser, true);

  return res.status(200).json({ data: { me: currentUser, accessToken } });
});
