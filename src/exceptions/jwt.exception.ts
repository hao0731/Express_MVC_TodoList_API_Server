import { ErrorRequestHandler } from 'express';
import { UnauthorizedError } from 'express-jwt';
import { ResponseObject } from '../common/response/response.object';

export const JWTException: ErrorRequestHandler = (err, req, res, next) => {
    if ( err instanceof UnauthorizedError ) {
        err = new ResponseObject({ status: err.status, data: err.message });
    }
    next(err);
};