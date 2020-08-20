// src/models/Role.ts
import { Model, DataTypes } from 'sequelize';

export interface RoleAttributes {
    id: number;
    name: string;
}

// Some attributes are optional in `Role.build` and `Role.create` calls
interface RoleCreationAttributes extends RoleAttributes {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes>
    implements RoleAttributes {
    public id!: number;
    public name!: string;
}

export const roleInit = (sequelize: any) => {
    return Role.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'roles',
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
