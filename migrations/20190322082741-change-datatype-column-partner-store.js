'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'partner_stores',
        'store_code', {
          type: Sequelize.BIGINT,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'partner_stores',
        'store_mobile', {
          type: Sequelize.BIGINT,
          allowNull: false,
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'partner_stores',
        'store_code', {
          type: Sequelize.INTEGER,
          unique: true,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'partner_stores',
        'store_mobile', {
          type: Sequelize.STRING,
          allowNull: false,
        }
      )
    ]);
  }
};