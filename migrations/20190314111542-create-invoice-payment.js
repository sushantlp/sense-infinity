"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("invoice_payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id"
        }
      },
      payment_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      card_no: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      warehouse_payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouse_payment_types",
          key: "warehouse_payment_id"
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
    return queryInterface.dropTable("invoice_payments");
  }
};
