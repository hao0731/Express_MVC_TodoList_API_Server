import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import appRoute from './app/app.routing';
import { Database } from './database';

const app = express();

dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });

app.use(cors());
app.use(helmet());

Database.connect();

app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});

app.use('/', appRoute);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ message: err.message || err });
});

app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));