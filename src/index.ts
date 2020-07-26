import 'reflect-metadata'; // this shim is required
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import https from 'https';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

// Controller imports
import { AmazonController } from './controllers/AmazonController';
import { NextFunction } from 'express';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    controllers: [AmazonController], // we specify controllers we want to use
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use((err: Error, req: Express.Request, res: any, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});

const httpsConfig = {
    key: fs
        .readFileSync(path.resolve(process.env.SSL_KEY_PATH), 'utf8')
        .toString(),
    cert: fs
        .readFileSync(
            path.resolve(process.cwd(), process.env.SSL_CERT_PATH),
            'utf8'
        )
        .toString(),
};

https.createServer(httpsConfig, app.callback()).listen('443');

app.listen(process.env.API_PORT, () => {
    console.log(`Example app listening on port ${process.env.API_PORT}!`);
});
