import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateSaveDBConfig = Joi.object({
  type: Joi.string().valid('mysql').required(),
  host: Joi.string().required(),
  database: Joi.string().required(),
  user: Joi.string().optional(),
  password: Joi.string().optional().allow('', null),
});

export const validateChat = Joi.object({
  promt: Joi.string().required(),
});
