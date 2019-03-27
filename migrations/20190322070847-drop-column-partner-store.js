'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('partner_stores', 'pincode'),
      queryInterface.removeColumn('partner_stores', 'longitude'),
      queryInterface.removeColumn('partner_stores', 'latitude'),
      queryInterface.removeColumn('partner_stores', 'sense'),
      queryInterface.removeColumn('partner_stores', 'gstin_no'),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'partner_stores',
        'pincode',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'partner_stores',
        'longitude',
        Sequelize.DOUBLE
      ),
      queryInterface.addColumn(
        'partner_stores',
        'latitude',
        Sequelize.DOUBLE
      ),
      queryInterface.addColumn(
        'partner_stores',
        'sense',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'partner_stores',
        'gstin_no',
        Sequelize.STRING
      ),
    ]);
  }
};