'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProductOrders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            isOrdered: {
                type: Sequelize.STRING,
            },
            firstNameOfChild: {
                type: Sequelize.STRING,
            },
            lastNameOfChild: {
                type: Sequelize.STRING,
            },
            firstNameOfParent: {
                type: Sequelize.STRING,
            },
            lastNameOfParent: {
                type: Sequelize.STRING,
            },
            emailAddressOfParent: {
                type: Sequelize.STRING,
            },
            streetAddress: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            state: {
                type: Sequelize.STRING,
            },
            zipCode: {
                type: Sequelize.STRING,
            },
            productTitle: {
                type: Sequelize.STRING,
            },
            amazonTitle: {
                type: Sequelize.STRING,
            },
            asin: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            rewardCardPrice: {
                type: Sequelize.INTEGER,
            },
            link: {
                type: Sequelize.STRING,
            },
            createdBy: {
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
        await queryInterface.dropTable('ProductOrders');
    },
};
