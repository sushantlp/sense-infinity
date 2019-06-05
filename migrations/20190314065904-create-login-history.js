"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("login_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "partners",
          key: "partner_id"
        }
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      store_counter_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      login_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logout_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      opening_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      closing_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      total_invoice: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      cash_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      card_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      sodexo_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      total_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
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
    return queryInterface.dropTable("login_histories");
  }
};
