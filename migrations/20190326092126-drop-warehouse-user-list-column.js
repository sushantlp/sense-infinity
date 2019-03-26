'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('warehouse_user_lists', 'warehouse_employe_id')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'warehouse_user_lists',
        'warehouse_employe_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'warehouse_employee_lists',
            key: 'id'
          }
        }
      )
    ]);
  }
};