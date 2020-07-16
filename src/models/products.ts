import Sequelize from 'sequelize';

export const Products = (sequelize: any) => {
    return sequelize.define('Products', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        asin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.STRING,
        },
        updateSource: {
            type: Sequelize.STRING,
        },
        amazonTitle: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};
