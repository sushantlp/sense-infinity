'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'partner_stores',
        'invoice_format',
        Sequelize.INTEGER,
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('partner_stores', 'invoice_format')
    ]);
  }
};