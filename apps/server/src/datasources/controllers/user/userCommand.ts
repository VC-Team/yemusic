import { Request, Response } from 'express';

import { jwtConfig } from '@config/index';
import { TSignUpInput, TPlayList } from '@interface/index';
import { yeToken, auth, nodemailer, user } from '@utils/controllers';
import { useHttpHandler } from '@utils/useHttpHandler';

import { User, PlayList } from '../../models';

export const signUp = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email, password, displayName }: TSignUpInput = req.body;

  const emailExists = await User.exists({ email });

  if (emailExists) {
    throw {
      errorCode: 'E-04',
      message: 'Email already exists.',
    };
  }

  const newUser = await user.createUser({ email, password, displayName });

  if (!newUser) {
    throw {
      errorCode: 'E-04',
      message: 'An error occurred while creating new user.',
    };
  }

  // generate Token
  const accessToken = yeToken.generateTokenForUser(req, res, newUser, true);

  res.status(200).json({ data: { me: newUser, accessToken } });

  const likedTrack: TPlayList = {
    name: 'Liked tracks',
    isLikedTrack: true,
    owner: newUser._id,
  };
  await Promise.all([nodemailer.sendEmailVerify(req, newUser), PlayList.create(likedTrack)]);

  return;
});

export const refreshToken = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw {
      errorCode: 'E-02',
      message: 'Refresh token invalid!',
    };
  }

  const { user } = yeToken.verifyToken({ token: refreshToken, secretKey: jwtConfig.secretRefreshToken });
  const accessToken = yeToken.generateTokenForUser(req, res, user);

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
  const { account, password }: { account: string; password: string } = req.body;

  const user = await User.findOne({
    $or: [{ email: account }, { username: account }, { phone: account }],
  }).lean();
  const compareHash = auth.compareHash(password, user?.password);

  if (!user || !compareHash)
    throw {
      errorCode: 'E-05',
      message: 'Email or Password is not correct, please try again!',
    };

  delete user.password;
  const accessToken = yeToken.generateTokenForUser(req, res, user, true);

  return res.status(200).json({ data: { me: user, accessToken } });
});
