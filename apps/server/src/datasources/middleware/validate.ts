import { Request, Response, NextFunction } from 'express';

import { routerConfig } from '@config/index';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validateInput = routerConfig[req.route.path]?.validateSchema;

  if (!validateInput) return;

  const { error } = validateInput.validate(req.body);
  if (!error) return;

  throw { message: error.format(), errorCode: 'E-01' };
};
