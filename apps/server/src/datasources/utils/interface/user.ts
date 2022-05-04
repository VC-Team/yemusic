import * as jwt from 'jsonwebtoken';

export type TParamsCreateToken = {
  payload: string | object | Buffer;
  expiration?: number;
};

export type TParamsVerifyToken = {
  token: string;
  options?: jwt.VerifyOptions;
};
