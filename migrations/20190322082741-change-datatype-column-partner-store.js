'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'partner_stores',
      'store_code', {
        type: Sequelize.STRING,
        allowNull: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'partner_stores',
      'store_code', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    )
  }
};