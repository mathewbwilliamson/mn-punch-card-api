// src/db/models/index.ts

import { Sequelize } from 'sequelize';
import { productInit } from './Products';
import { userInit, User } from './User';
import { roleInit, Role } from './Role';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const url = `mssql://reward-cabinet-new-tampa.database.windows.net`;

const sequelize = new Sequelize(url, config);

const db = {
    sequelize,
    Sequelize,
    Products: productInit(sequelize),
    User: userInit(sequelize),
    Role: roleInit(sequelize),
    ROLES: ['student', 'admin', 'instructor'],
};

Role.belongsToMany(Role, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId',
});

User.belongsToMany(User, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
