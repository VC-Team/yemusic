import { Request, Response, NextFunction } from 'express';

import { validate, authenticate } from '../middleware';
/**
 * It takes a function that returns a promise, and returns a function that returns a promise
 * @param fn - (req: Request, res: Response, next: NextFunction) => Promise<Response>
 * @returns A function that takes in a request, response, and next function.
 */
export function useHttpHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authenticate(req, res, next);
      await validate(req, res, next);
    } catch (error) {
      next(error);
    }

    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}
