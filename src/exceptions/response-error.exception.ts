import { ErrorRequestHandler } from 'express';
import { ResponseObject } from '../common/response/response.object';
import { ResponseError } from '../common/response/response-error.object';

export const ResponseErrorException: ErrorRequestHandler = (err, req, res, next) => {
    if ( err instanceof ResponseError ) {
        err = new ResponseObject({ status: err.status, message: err.message });
    }
    next(err);
};