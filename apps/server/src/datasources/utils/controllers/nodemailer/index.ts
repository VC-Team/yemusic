import { sendMail } from './nodemailer';
import { sendEmailVerify } from './sendMailTemplate';

export const nodemailer = {
  sendMail,
  sendEmailVerify,
};
