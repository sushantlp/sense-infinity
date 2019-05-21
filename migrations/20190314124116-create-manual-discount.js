"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("manual_discounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouse_user_lists",
          key: "id"
        }
      },
      invoice_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id"
        }
      },
      discount_amount: {
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
    return queryInterface.dropTable("manual_discounts");
  }
};
