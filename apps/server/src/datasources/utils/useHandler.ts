import { Request, Response, NextFunction } from 'express';

/**
 * It takes a function that returns a promise, and returns a function that returns a promise
 * @param fn - (req: Request, res: Response, next: NextFunction) => Promise<Response>
 * @returns A function that takes in a request, response, and next function.
 */
export function useHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
}
