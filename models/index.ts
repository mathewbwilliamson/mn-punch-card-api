// src/db/models/index.ts

import { Sequelize } from 'sequelize';
import { productInit } from './Products';
import { productOrderInit } from './ProductOrder';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

// [matt] WHY IS THIS HARDCODEDDDDDD?
const url = `mssql://reward-cabinet-new-tampa.database.windows.net`;

const sequelize = new Sequelize(url, config);

const db = {
    sequelize,
    Sequelize,
    Products: productInit(sequelize),
    ProductOrder: productOrderInit(sequelize),
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
