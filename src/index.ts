import 'reflect-metadata'; // this shim is required
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import { NextFunction } from 'express';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import dotenv from 'dotenv';
dotenv.config();

// Controller imports
import { AmazonController } from './controllers/AmazonController';
import { EmailController } from './controllers/EmailController';
import { OrderProductController } from './controllers/OrderProductController';
import { RefreshHistoryController } from './controllers/RefreshHistoryController';

export const logger = pino(
    {
        level: process.env.LOG_LEVEL || 'info',
        prettyPrint: { levelFirst: true },
    },
    process.env.LOG_DESTINATION !== 'console' &&
        pino.destination('./logs/pino.log')
);
const expressLogger = expressPino({ logger });

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    controllers: [
        AmazonController,
        EmailController,
        OrderProductController,
        RefreshHistoryController,
    ], // we specify controllers we want to use
});

app.use(expressLogger);

app.use(bodyParser.urlencoded({ extended: false }));

app.use((err: Error, req: Express.Request, res: any, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    console.log('\x1b[43m%s \x1b[0m', 'ERROR', err);
});

app.listen(process.env.API_PORT, () => {
    logger.info(`Server listening on port ${process.env.API_PORT}!`);
});
