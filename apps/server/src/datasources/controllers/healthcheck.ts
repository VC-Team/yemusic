import { Request, Response } from 'express';

import { useHttpHandler } from '@utils/helper/useHttpHandler';

export const healthCheck = useHttpHandler(async (_req: Request, res: Response): Promise<Response> => {
  return res.send({ isSuccess: true });
});
