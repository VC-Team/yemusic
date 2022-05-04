import { Request } from 'express';

import { yeToken } from '@utils/controllers';

import { sendMail } from './nodemailer';

export async function sendEmailVerify(req: Request, email) {
  const tokenVerifyEmail = yeToken.createToken({ payload: { email } });

  const subject = 'Verify your email to complete sign up Yemusic';
  const verifyURL = `${req.protocol}://${req.get('host')}/api/auth/verifyEmail/${tokenVerifyEmail}`;
  const html = `
  <b>Just one more step to complete the registration 🥳</b>
  <div>
    <a href="${verifyURL}" target="_blank">Click this link to complete</a>
  </div>
  `;

  const info = await sendMail({ to: email, subject, html });
  return { messageId: info?.messageId };
}
