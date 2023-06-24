import { NextFunction, Request, Response } from 'express';

/**
 * Global Promise return
 * @function catchAsync
 * @param {*} fn
 * @returns promise
 */
const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
