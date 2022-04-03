import { Request, Response, NextFunction } from 'express';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};
