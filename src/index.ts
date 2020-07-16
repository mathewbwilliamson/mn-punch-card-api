import express from 'express';
import bodyParser from 'body-parser';
import { ProductsModel } from './config/database-connection';
const app = express();

// Controller imports
import amazonRoutes from './controllers/amazon';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(amazonRoutes);

app.get('/', (req, res) => {
    console.log('\x1b[41m%s \x1b[0m', '[matt] BASIC ROUTE');
    res.send('Hello World!');
});

console.log('\x1b[41m%s \x1b[0m', '[matt] Products', ProductsModel);
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
