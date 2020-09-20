'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('ProductOrders', 'isHidden', {
                type: Sequelize.BOOLEAN,
            }),
            queryInterface.addColumn('ProductOrders', 'isDeleted', {
                type: Sequelize.BOOLEAN,
            }),
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('ProductOrders', 'isHidden'),
            queryInterface.removeColumn('ProductOrders', 'isDeleted'),
        ]);
    },
};
