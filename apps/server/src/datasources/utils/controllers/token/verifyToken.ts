import * as jwt from 'jsonwebtoken';

import { TParamsVerifyToken } from '../../interface/token';

/**
 * It verifies a token and returns the decoded token
 * @param {TParamsVerifyToken}  - TParamsVerifyToken
 * @returns The decoded token.
 */
export default function verifyToken({ token, options }: TParamsVerifyToken): string | jwt.JwtPayload {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, options);

  return decoded;
}
