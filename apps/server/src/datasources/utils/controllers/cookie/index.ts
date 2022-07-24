import { Request, Response } from 'express';

import { TPayload } from '@interface/index';

export function setCookie(req: Request, res: Response, payload: TPayload) {
  const { key, value, path } = payload;

  res.cookie(key, value, {
    httpOnly: true,
    secure: true,
    path: `/api/${path}`,
    domain: req.hostname,
  });
}
