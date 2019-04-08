'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'partner_stores',
        'store_code', {
          type: Sequelize.BIGINT,
          unique: true,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'partner_stores',
        'store_mobile', {
          type: Sequelize.BIGINT,
          unique: true,
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
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'partner_stores',
        'store_mobile', {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        }
      )
    ]);
  }
};