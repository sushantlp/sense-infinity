"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("warehouse_supplier_invoice_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      supplier_invoice_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "warehouse_supplier_invoices",
          key: "id"
        }
      },
      product_code: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      product_type: {
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hsn_code: {
        type: Sequelize.INTEGER
      },
      mrp: {
        type: Sequelize.DOUBLE
      },
      quantity: {
        type: Sequelize.DOUBLE
      },
      free_quantity: {
        type: Sequelize.DOUBLE
      },
      rate: {
        type: Sequelize.DOUBLE
      },
      unit_value: {
        type: Sequelize.DOUBLE
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pri_sch: {
        type: Sequelize.DOUBLE
      },
      sec_sch: {
        type: Sequelize.DOUBLE
      },
      spl_disc: {
        type: Sequelize.DOUBLE
      },
      cgst: {
        type: Sequelize.DOUBLE
      },
      sgst: {
        type: Sequelize.DOUBLE
      },
      igst: {
        type: Sequelize.DOUBLE
      },
      margin: {
        type: Sequelize.DOUBLE
      },
      total_amount: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable("warehouse_supplier_invoice_products");
  }
};
