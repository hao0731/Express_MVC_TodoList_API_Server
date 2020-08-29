import { Router } from 'express';
import { ControllerBase } from './controller.base';

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

}