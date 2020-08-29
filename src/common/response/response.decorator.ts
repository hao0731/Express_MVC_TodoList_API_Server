import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from './response.object';

import { ControllerBase } from '../../bases/controller.base';
import { HttpStatus } from '../../types/response.type';

export function ResponseHandler(target: ControllerBase, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
        return method.call(target, req, res, next)
            .then((obj: ResponseObject) => res.status(obj.status).json(obj))
            .catch((err: Error) => next(target.formatResponse(err.message, HttpStatus.INTERNAL_ERROR)));
    };
};