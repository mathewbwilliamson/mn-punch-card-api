// src/models/Products.ts
import { Sequelize, Optional, Model, DataTypes } from 'sequelize';

export interface ProductsAttributes {
    id: number;
    title: string;
    asin: string;
    amazonTitle: string;
    updatedAt: string;
    createdBy: string;
    createdAt: string;
    price?: number;
    rewardCardPrice?: number;
    link?: string;
    imageUrl?: string;
    isDeleted?: boolean;
    updateSource?: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface ProductsCreationAttributes
    extends Optional<ProductsAttributes, 'id' | 'updatedAt' | 'createdAt'> {}

export class Products
    extends Model<ProductsAttributes, ProductsCreationAttributes>
    implements ProductsAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public title!: string;
    public asin!: string;
    public amazonTitle!: string;
    public updatedAt!: string;
    public createdBy!: string;
    public createdAt!: string;
    public price!: number;
    public rewardCardPrice!: number;
    public link!: string;
    public imageUrl!: string;
    public isDeleted!: boolean;
    public updateSource!: string;
}

export const productInit = (sequelize: any) => {
    return Products.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: { type: DataTypes.STRING, allowNull: false },
            price: DataTypes.INTEGER,
            rewardCardPrice: DataTypes.INTEGER,
            asin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            link: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updateSource: DataTypes.STRING,
            amazonTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'products',
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
