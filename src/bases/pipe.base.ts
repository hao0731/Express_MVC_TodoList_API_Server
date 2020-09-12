import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { HttpStatus } from '../types/response.type';

import { ResponseError } from '../common/response/response-error.object';

export abstract class PipeBase {

    public abstract transform(): any[];

    protected validationHandler(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const arr = errors.array();
            throw new ResponseError(arr.map(err => err.msg), HttpStatus.UNPROCESSABLE);
        }
        next();
    }

}