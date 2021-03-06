import { TParamsSendMail } from '@interface/index';
import * as nodemailer from 'nodemailer';
import { nodemailerConfig } from 'src/config';

/**
 * Create a reusable transporter object using the default SMTP transport
 * @param [isUseTestAccount=false] - If you want to use the test account, set it to true. Otherwise,
 * set it to false.
 * @returns A transporter object.
 */
async function createTransport(isUseTestAccount = false) {
  if (isUseTestAccount) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const accountTest = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: accountTest.user,
        pass: accountTest.pass,
      },
    });
  }
  return nodemailer.createTransport({
    host: nodemailerConfig.host,
    port: nodemailerConfig.port,
    secure: nodemailerConfig.secure,
    auth: {
      user: nodemailerConfig.username,
      pass: nodemailerConfig.password,
    },
  });
}

/**
 * Send an email using the nodemailer package
 * @param {TParamsSendMail}  - to: The recipient's email address.
 * @returns The messageId and previewURL.
 */
export async function sendMail({ to, subject, text, html, isUseTestAccount }: TParamsSendMail) {
  const transport = await createTransport(isUseTestAccount);

  const info = await transport.sendMail({
    from: nodemailerConfig.displayName,
    to,
    subject,
    text,
    html,
  });

  return { messageId: info?.messageId || '', previewURL: nodemailer.getTestMessageUrl(info) || '' };
}
