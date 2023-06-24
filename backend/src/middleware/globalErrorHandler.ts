import createHttpError from 'http-errors';
import Joi from 'joi';

// eslint-disable-next-line no-unused-vars
/**
 * Error handler
 * @property {Middleware} globalErrorHandler
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  console.log('error');

  if (createHttpError.isHttpError(err)) {
    console.log(err);
    res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
      errors: { invalid: err.name },
      data: [],
    });
  } else if (err instanceof Joi.ValidationError) {
    console.log(err);
    const badRequestError = createHttpError.BadRequest();
    res.status(badRequestError.statusCode).json({
      statusCode: badRequestError.statusCode,
      message: badRequestError.message,
      data: [],
      errors: { invalid: badRequestError.message },
    });
  } else {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      data: [],
      message: 'Internal Server Error',
      errors: { server: 'Internal Server Error' },
    });
  }
};

const notFound = (req: any, res: any, next: any) => {
  throw new createHttpError.NotFound(`Not Found - ${req.originalUrl}`);
};

export { notFound, globalErrorHandler };
