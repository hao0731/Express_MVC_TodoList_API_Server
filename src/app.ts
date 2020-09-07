import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

import { AppRoute } from './app.routing';

import { Database } from './database';

export class App {

    private app = express();
    private route!: AppRoute;

    constructor() {
        this.setEnvironment();
        this.setHelmet();
        this.setCors();
        this.setPassport();
        this.registerRoute();
    }

    // ====================================================================
    // @Public Methods
    // ====================================================================

    public bootstrap(): void {
        this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${ process.env.PORT }.`));
    }

    public setException(handler: ErrorRequestHandler): void {
        this.app.use(handler);
    }

    public launchDatabase(): void {
        const database = new Database();
        database.connect();
    }

    // ====================================================================
    // @Private Methods
    // ====================================================================

    private setHelmet(): void {
        this.app.use(helmet());
    }

    private setCors(): void {
        this.app.use(cors());
    }

    private setPassport(): void {
        passport.initialize();
    }

    private setEnvironment(): void {
        dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
    }

    private registerRoute(): void {
        this.route = new AppRoute();
        this.app.use('/', this.route.router);
    }

}