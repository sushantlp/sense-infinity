'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('warehouse_employee_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouse_employe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'actions_unique'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dept_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender_id: {
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partner_stores',
          key: 'store_id'
        }
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
    return queryInterface.dropTable('warehouse_employee_lists');
  }
};