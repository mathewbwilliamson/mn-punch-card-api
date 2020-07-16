import { Sequelize } from 'sequelize';
import { Products } from '../models/products';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'reward-cabinet-new-tampa.database.windows.net',
    database: 'MathnasiumRewardCabinet',
    username: 'api_user',
    password: process.env.DB_PASSWORD,
    logging: true,
});

export const ProductsModel = Products(sequelize);

sequelize.sync().then(() => {
    console.log(`Database & tables created (if needed)!`);
});
