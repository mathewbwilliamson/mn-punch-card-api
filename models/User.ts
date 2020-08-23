// src/models/User.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { Role } from '../src/types/userTypes';

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    authorizedDate?: string;
    updatedAt?: string;
    createdAt: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'updatedAt' | 'createdAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    updatedAt: string;
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: Role;
    public authorizedDate!: string;
    public createdAt!: string;
}

export const userInit = (sequelize: any) => {
    return User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            authorizedDate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'users',
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
