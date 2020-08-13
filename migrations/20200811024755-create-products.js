'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            rewardCardPrice: {
                type: Sequelize.INTEGER,
            },
            asin: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            link: {
                type: Sequelize.STRING,
            },
            imageUrl: {
                type: Sequelize.STRING,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
            },
            createdBy: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            updateSource: {
                type: Sequelize.STRING,
            },
            amazonTitle: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    },
};
