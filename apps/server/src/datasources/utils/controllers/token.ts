import * as jwt from 'jsonwebtoken';
import { jwtConfig } from 'src/config';

type TParamsCreateToken = {
  payload: string | object | Buffer;
  expiration?: number;
};

type TParamsVerifyToken = {
  token: string;
  options?: jwt.VerifyOptions;
};

/**
 * It creates a token using the payload and expiration passed in as parameters
 * @param {TParamsCreateToken}  - TParamsCreateToken
 * @returns A token
 */
export function createToken({ expiration, payload }: TParamsCreateToken) {
  const expiresIn = expiration || jwtConfig.expiration; // default 90 days token is alive

  const token = jwt.sign(payload, jwtConfig.secret_key, { expiresIn });

  return token;
}

/**
 * It verifies a token and returns the decoded token
 * @param {TParamsVerifyToken}  - TParamsVerifyToken
 * @returns The decoded token.
 */
export function verifyToken({ token, options }: TParamsVerifyToken): string | jwt.JwtPayload {
  const decoded = jwt.verify(token, jwtConfig.secret_key, options);

  return decoded;
}
