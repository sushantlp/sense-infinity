"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const storeSupplierInvoiceProduct = sequelize.define(
    "store_supplier_invoice_product",
    {
      supplier_invoice_id: DataTypes.INTEGER.UNSIGNED,
      product_code: DataTypes.BIGINT,
      product_type: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      hsn_code: DataTypes.INTEGER,
      mrp: DataTypes.DOUBLE,
      quantity: DataTypes.DOUBLE,
      free_quantity: DataTypes.DOUBLE,
      rate: DataTypes.DOUBLE,
      unit_value: DataTypes.DOUBLE,
      unit: DataTypes.STRING,
      pri_sch: DataTypes.DOUBLE,
      sec_sch: DataTypes.DOUBLE,
      spl_disc: DataTypes.DOUBLE,
      cgst: DataTypes.DOUBLE,
      sgst: DataTypes.DOUBLE,
      igst: DataTypes.DOUBLE,
      margin: DataTypes.DOUBLE,
      total_amount: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeSupplierInvoiceProduct.associate = function(models) {
    // associations can be defined here
  };
  return storeSupplierInvoiceProduct;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

/**
 * End Database Read and Write
 */
