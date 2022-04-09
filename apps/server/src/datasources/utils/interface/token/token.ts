import { VerifyOptions } from 'jsonwebtoken';

export type TParamsCreateToken = {
  payload: string | object | Buffer;
  expiration?: number;
};

export type TParamsVerifyToken = {
  token: string;
  options?: VerifyOptions;
};
