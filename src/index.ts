import 'reflect-metadata'; // this shim is required
import express from 'express';
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import { ProductsModel } from './config/database-connection';

// Controller imports
import { UserController } from './controllers/AmazonController';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    controllers: [UserController], // we specify controllers we want to use
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
