import { Request, Response } from 'express';

import { useHttpHandler } from '@utils/useHttpHandler';

// Example: useHttpHandler
export const signUp = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const data = [];
  if (data.length === 0) {
    throw { errorCode: 'E-04', message: 'data not found' };
  }
  return res.status(200).json(req.body);
});
