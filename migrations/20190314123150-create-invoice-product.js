"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("invoice_products", {
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
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_barcode: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      product_unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      product_sgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_cgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_igst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      product_discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_discount_price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      product_sub_total: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      return_status: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable("invoice_products");
  }
};
