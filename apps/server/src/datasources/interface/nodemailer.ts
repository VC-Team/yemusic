export type TParamsSendMail = {
  from?: string;
  to: string | string[];
  subject: string;
  text?: string;
  html: string;
  isUseTestAccount?: boolean;
};
