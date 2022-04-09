import * as jwt from 'jsonwebtoken';

import { TParamsCreateToken } from '../../interface/token';

/**
 * It creates a token using the payload and expiration passed in as parameters
 * @param {TParamsCreateToken}  - TParamsCreateToken
 * @returns A token
 */
export default function createToken({ expiration, payload }: TParamsCreateToken) {
  const expiresIn = expiration || parseInt(process.env.JWT_EXPIRATION); // default 90 days token is alive

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });

  return token;
}
