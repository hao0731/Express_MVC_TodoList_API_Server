import { Router, Request, Response, NextFunction } from 'express';
import { ControllerBase } from './controller.base';
import { PipeBase } from './pipe.base';

import { HttpStatus } from '../types/response.type';

import { ResponseObject } from '../common/response/response.object';

export abstract class RouteBase {

    public router = Router();
    protected controller!: ControllerBase;

    constructor() {
        this.initial();
    }

    protected initial(): void {
        this.registerRoute();
    }

    protected abstract registerRoute(): void;

    protected usePipe(prototype: any): any[] {
        const pipe = new prototype();
        return (pipe as PipeBase).transform();
    }

    protected responseHandler(method: (req: Request, res: Response, next: NextFunction) => Promise<ResponseObject<any>>, controller = this.controller) {
        return (req: Request, res: Response, next: NextFunction) => {
            method.call(this.controller, req, res, next)
                .then(obj => res.status(obj.status).json(obj))
                .catch((err: Error) => next(controller.formatResponse(err.message, (err as any).status || HttpStatus.INTERNAL_ERROR)));
        };
    }

}