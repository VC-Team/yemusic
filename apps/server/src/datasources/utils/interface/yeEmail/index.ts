/**
 *
 * @property {string} from - The email address of the sender.
 * @property {string | string[]} to - The email address or addresses where the email will be sent to.
 * The string or array of strings can be comma or semicolon separated.
 * @property {string} subject - The subject of the email.
 * @property {string} text - The text version of the email.
 * @property {string} html - The HTML version of the email.
 * @property {boolean} isUseTestAccount - If true, the email will be sent using the test account.
 */
export type TParamsSendMail = {
  from?: string;
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  isUseTestAccount?: boolean;
};
