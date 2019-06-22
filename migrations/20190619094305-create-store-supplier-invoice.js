"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("store_supplier_invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "partner_stores",
          key: "store_id"
        }
      },
      invoice_number: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      supplier_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_one: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gstin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      inv_no: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoice_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sn_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rt_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sm_phone: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      del_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoice_total_amount: {
        type: Sequelize.DOUBLE
      },
      payment_status: {
        type: Sequelize.INTEGER
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_reference_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      e_way_bill: {
        type: Sequelize.STRING,
        allowNull: true
      },
      s_note: {
        type: Sequelize.STRING,
        allowNull: true
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      track_status: {
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
    return queryInterface.dropTable("store_supplier_invoices");
  }
};
