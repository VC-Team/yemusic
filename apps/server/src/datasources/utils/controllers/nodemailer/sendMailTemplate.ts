import { Request } from 'express';

import { jwtConfig } from '@config';
import { yeToken } from '@utils/controllers';

import { sendMail } from './nodemailer';

export async function sendEmailVerify(req: Request, user) {
  const tokenVerifyEmail = yeToken.createToken({
    payload: user,
    expiration: jwtConfig.emailValidateExpiration,
  });

  const subject = 'Verify your email to complete sign up Yemusic';
  const verifyURL = `${req.protocol}://${req.get('host')}/api/auth/verifyEmail/${tokenVerifyEmail}`;
  const html = `
  <b>Just one more step to complete the registration 🥳</b>
  <div>
    <a href="${verifyURL}" target="_blank">Click this link to complete</a>
  </div>
  `;

  const info = await sendMail({ to: user.email, subject, html });
  return { messageId: info?.messageId };
}
