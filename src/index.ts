import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import appRoute from './app/app.routing';

const app = express();

dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });

app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});

app.use('/', appRoute);

app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));