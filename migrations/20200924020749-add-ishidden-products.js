'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Products', 'isHidden', {
                type: Sequelize.BOOLEAN,
            }),
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Products', 'isHidden'),
        ]);
    },
};
