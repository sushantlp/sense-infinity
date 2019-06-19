"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseSupplierInvoice = sequelize.define(
    "warehouse_supplier_invoice",
    {
      partner_id: DataTypes.INTEGER,
      invoice_number: DataTypes.INTEGER,
      supplier_name: DataTypes.STRING,
      address_one: DataTypes.STRING,
      address_two: DataTypes.STRING,
      landmark: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      mobile: DataTypes.BIGINT,
      email: DataTypes.STRING,
      gstin: DataTypes.STRING,
      cin: DataTypes.STRING,
      pan: DataTypes.STRING,
      note: DataTypes.TEXT,
      inv_no: DataTypes.STRING,
      invoice_date: DataTypes.STRING,
      sn_name: DataTypes.STRING,
      rt_name: DataTypes.STRING,
      sm_phone: DataTypes.BIGINT,
      del_date: DataTypes.STRING,
      invoice_total_amount: DataTypes.DOUBLE,
      payment_status: DataTypes.INTEGER,
      payment_type: DataTypes.STRING,
      payment_date: DataTypes.STRING,
      payment_reference_number: DataTypes.STRING,
      e_way_bill: DataTypes.STRING,
      s_note: DataTypes.STRING,
      warehouse_user_id: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseSupplierInvoice.associate = function(models) {
    // associations can be defined here
  };
  return warehouseSupplierInvoice;
};
