// src/models/RefreshHistory.ts
import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import { Products } from './Products';

export interface RefreshHistoryAttributes {
    id: number;
    errorMessage: string;
    asin: string;
    productId: number;
    updatedAt: string;
    createdAt: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface RefreshHistoryCreationAttributes
    extends Optional<
        RefreshHistoryAttributes,
        'id' | 'updatedAt' | 'createdAt'
    > {}

export class RefreshHistory
    extends Model<RefreshHistoryAttributes, RefreshHistoryCreationAttributes>
    implements RefreshHistoryAttributes {
    public errorMessage!: string;
    public productId!: number;
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public asin!: string;
    public updatedAt!: string;
    public createdAt!: string;
}

export const refreshHistoryInit = (sequelize: any) => {
    RefreshHistory.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            errorMessage: {
                type: DataTypes.STRING,
            },
            asin: {
                type: DataTypes.STRING,
            },
            productId: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'RefreshHistories',
            sequelize, // passing the `sequelize` instance is required
        }
    );

    return RefreshHistory.belongsTo(Products, { foreignKey: 'productId' });
};
