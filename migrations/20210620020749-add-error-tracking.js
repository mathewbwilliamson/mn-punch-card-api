'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'errorMessage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('RefreshHistories', 'oldTitle', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('RefreshHistories', 'newTitle', {
        type: Sequelize.STRING,
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Products', 'errorMessage'),
      queryInterface.removeColumn('RefreshHistories', 'oldTitle'),
      queryInterface.removeColumn('RefreshHistories', 'newTitle'),
    ]);
  },
};
