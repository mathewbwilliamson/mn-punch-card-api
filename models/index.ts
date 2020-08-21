// src/db/models/index.ts

import { Sequelize } from 'sequelize';
import { productInit } from './Products';
import { userInit } from './User';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const url = `mssql://reward-cabinet-new-tampa.database.windows.net`;

const sequelize = new Sequelize(url, config);

const db = {
    sequelize,
    Sequelize,
    Products: productInit(sequelize),
    User: userInit(sequelize),
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
