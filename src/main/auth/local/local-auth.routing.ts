import express from 'express';

import { RouteBase } from '../../../bases/route.base';
import { LocalAuthController } from './local-auth.controller';

export class LocalAuthRoute extends RouteBase {

    protected controller!: LocalAuthController;

    protected initial(): void {
        this.controller = new LocalAuthController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.post('/signup', express.json(), this.responseHandler(this.controller.signup));
        this.router.post('/signin', express.json(), this.responseHandler(this.controller.signin));
    }

}