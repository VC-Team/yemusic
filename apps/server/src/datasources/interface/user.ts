import * as jwt from 'jsonwebtoken';

export type TSignUpInput = {
  email: string;
  password: string;
  displayName: string;
};

export type TSignInInput = {
  account: string;
  password: string;
};

export type TParamsCreateToken = {
  payload: string | object | Buffer;
  secretKey?: string;
  expiration?: number;
};

export type TParamsVerifyToken = {
  token: string;
  secretKey?: string;
  options?: jwt.VerifyOptions;
};

export type TPayloadAccessToken = {
  user: { _id: string };
  allowedAt: Date;
};
