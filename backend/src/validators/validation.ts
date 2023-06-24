import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateSaveDBConfig = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    type: Joi.string().valid('mysql').required(),
    hostname: Joi.string().required(),
    database: Joi.string().required(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
  });
  const resp = schema.validate(req.body);
  if (resp.error) {
    res.send(resp.error.details[0].message);
  } else {
    next();
  }
};
