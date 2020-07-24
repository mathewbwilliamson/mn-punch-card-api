import { Sequelize } from 'sequelize';
import { Products } from '../models/Products';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
});

export const ProductsModel = Products(sequelize);

sequelize.sync().then(() => {
    console.log(`Database & tables created (if needed)!`);
});
