import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { AppRoute } from './app.routing';

export class App {

    private app = express();
    private route: AppRoute = new AppRoute();

    constructor() {
        this.setEnvironment();
        this.registerRoute();
    }

    // ====================================================================
    // @Public Methods
    // ====================================================================

    public bootstrap(): void {
        this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${ process.env.PORT }.`));
    }

    public enableCors(): void {
        this.app.use(cors());
    }

    public enableHelmet(): void {
        this.app.use(helmet());
    }

    public setException(handler: ErrorRequestHandler): void {
        this.app.use(handler);
    }

    // ====================================================================
    // @Private Methods
    // ====================================================================

    private setEnvironment(): void {
        dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
    }

    private registerRoute(): void {
        this.app.use('/', this.route.router);
    }

}