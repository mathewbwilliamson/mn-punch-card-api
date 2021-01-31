'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('RefreshHistories', 'oldRewardCardPrice', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('RefreshHistories', 'newRewardCardPrice', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('RefreshHistories', 'oldRewardCardPrice'),
      queryInterface.removeColumn('RefreshHistories', 'newRewardCardPrice'),
    ]);
  },
};
