"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      invoice_no: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: "actions_unique"
      },
      store_counter_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
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
        allowNull: false,
        references: {
          model: "partner_stores",
          key: "store_id"
        }
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      customer_mobile: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      membership_code: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      total_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      invoice_cashback: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      invoice_total_saving: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      invoice_loyalty_used: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      invoice_sodexo_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      invoice_total_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      gstin_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gstin_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      round_off_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      return_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      home_delivery: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      invoice_created_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoice_updated_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      track_status: {
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
    return queryInterface.dropTable("invoices");
  }
};
