// src/models/User.ts
import { Model, DataTypes } from 'sequelize';

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends UserAttributes {}

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: string;
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
        },
        {
            tableName: 'users',
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
