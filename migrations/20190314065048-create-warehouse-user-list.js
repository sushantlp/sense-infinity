'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('warehouse_user_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'actions_unique'
      },
      warehouse_role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'warehouse_role_lists',
          key: 'warehouse_role_id'
        }
      },
      warehouse_employe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'warehouse_employee_lists',
          foreignKey: 'warehouse_employe_id'
        }
      },
      partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('warehouse_user_lists');
  }
};