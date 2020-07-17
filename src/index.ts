import 'reflect-metadata'; // this shim is required
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// Controller imports
import { AmazonController } from './controllers/AmazonController';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    controllers: [AmazonController], // we specify controllers we want to use
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.API_PORT, () => {
    console.log(`Example app listening on port ${process.env.API_PORT}!`);
});
