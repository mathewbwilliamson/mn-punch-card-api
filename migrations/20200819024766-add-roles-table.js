'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Roles', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        await queryInterface.bulkInsert('Roles', [
            { name: 'user' },
            { name: 'admin' },
            { name: 'instructor' },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Roles');
    },
};
