import { TParamsSendMail } from '@utils/interface';
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

    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: accountTest.user, // generated ethereal user
        pass: accountTest.pass, // generated ethereal password
      },
    });
  }

  return nodemailer.createTransport({
    host: nodemailerConfig.host,
    service: nodemailerConfig.service,
    url: nodemailerConfig.url,
    port: nodemailerConfig.port,
    secure: nodemailerConfig.secure, // true for 465, false for other ports
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
  try {
    const transport = await createTransport(isUseTestAccount);

    // send mail with defined transport object
    const info = await transport.sendMail({
      from: nodemailerConfig.displayName, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    return { messageId: info?.messageId || '', previewURL: nodemailer.getTestMessageUrl(info) || '' };
  } catch (error) {
    console.error;
  }
}
