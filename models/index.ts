// src/db/models/index.ts

import { Sequelize } from 'sequelize';
import { productInit } from './Products';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const url = `mssql://reward-cabinet-new-tampa.database.windows.net`;

const sequelize = new Sequelize(url, config);

const db = {
    sequelize,
    Sequelize,
    Products: productInit(sequelize),
};
console.log('\x1b[41m%s \x1b[0m', '[matt] 4', db.Products);

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});
console.log('\x1b[41m%s \x1b[0m', '[matt] 5');

export default db;
