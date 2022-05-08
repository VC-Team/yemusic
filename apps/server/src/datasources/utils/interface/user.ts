import * as jwt from 'jsonwebtoken';

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
