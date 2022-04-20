import { Request } from 'express';

import { yeToken } from '..';
import { sendMail } from './nodemailer';

export async function sendEmailVerify(req: Request, email) {
  const tokenVerifyEmail = yeToken.createToken({ payload: { email } });

  const verifyURL = `${req.protocol}://${req.get('host')}/api/auth/verifyEmail/${tokenVerifyEmail}`;
  const info = await sendMail({
    to: email,
    subject: 'Verify your email to complete sign up Yemusic',
    html: `
      <b>Just one more step to complete the registration 🥳</b>
      <div>
        <a href="${verifyURL}" target="_blank">Click this link to complete</a>
      </div>
      `,
  });

  return { messageId: info.messageId || '' };
}
