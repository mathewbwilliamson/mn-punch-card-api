// src/models/ProductOrder.ts
import { Sequelize, Optional, Model, DataTypes } from 'sequelize';

export interface ProductOrderAttributes {
    id: number;
    isOrdered: boolean;
    firstNameOfChild: string;
    lastNameOfChild: string;
    firstNameOfParent: string;
    lastNameOfParent: string;
    emailAddressOfParent: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    productTitle: string;
    amazonTitle: string;
    asin: string;
    price: number;
    rewardCardPrice: number;
    link: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface ProductOrderCreationAttributes
    extends Optional<
        ProductOrderAttributes,
        'id' | 'updatedAt' | 'createdAt' | 'isOrdered'
    > {}

export class ProductOrder
    extends Model<ProductOrderAttributes, ProductOrderCreationAttributes>
    implements ProductOrderAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public isOrdered!: boolean;
    public firstNameOfChild!: string;
    public lastNameOfChild!: string;
    public firstNameOfParent!: string;
    public lastNameOfParent!: string;
    public emailAddressOfParent!: string;
    public streetAddress!: string;
    public city!: string;
    public state!: string;
    public zipCode!: string;
    public productTitle!: string;
    public asin!: string;
    public amazonTitle!: string;
    public updatedAt!: string;
    public createdBy!: string;
    public createdAt!: string;
    public price!: number;
    public rewardCardPrice!: number;
    public link!: string;
}

export const productOrderInit = (sequelize: any) => {
    return ProductOrder.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            isOrdered: {
                type: DataTypes.STRING,
            },
            firstNameOfChild: {
                type: DataTypes.STRING,
            },
            lastNameOfChild: {
                type: DataTypes.STRING,
            },
            firstNameOfParent: {
                type: DataTypes.STRING,
            },
            lastNameOfParent: {
                type: DataTypes.STRING,
            },
            emailAddressOfParent: {
                type: DataTypes.STRING,
            },
            streetAddress: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.STRING,
            },
            zipCode: {
                type: DataTypes.STRING,
            },
            productTitle: {
                type: DataTypes.STRING,
            },
            amazonTitle: {
                type: DataTypes.STRING,
            },
            asin: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.NUMBER,
            },
            rewardCardPrice: {
                type: DataTypes.NUMBER,
            },
            link: {
                type: DataTypes.STRING,
            },
            createdBy: {
                type: DataTypes.STRING,
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
            tableName: 'productOrders',
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
