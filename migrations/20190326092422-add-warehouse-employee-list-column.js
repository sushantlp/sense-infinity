'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'warehouse_employee_lists',
        'warehouse_user_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'warehouse_user_lists',
            key: 'id'
          }
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('warehouse_employee_lists', 'warehouse_user_id')
    ]);
  }
};