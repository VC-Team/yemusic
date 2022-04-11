import { Request, Response } from 'express';

import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logErrors = (err, req: Request, res: Response, _) => {
  const now = moment().format('MM-DD-YY HH:mm:ss');
  const { errorCode, message } = err;

  logger.error(`[${now}]`, {
    //token: ...
    url: req.originalUrl,
    input: { ...req.body, ...req.params },
    errorCode,
    message: message || err,
  });

  return res.status(500).json(errorCode !== 'E-03' ? err : { errorCode: 'E-03' });
};
