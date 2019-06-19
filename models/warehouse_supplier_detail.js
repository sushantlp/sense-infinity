"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseSupplierDetail = sequelize.define(
    "warehouse_supplier_detail",
    {
      supplier_name: DataTypes.STRING,
      supplier_address_one: DataTypes.STRING,
      supplier_address_two: DataTypes.STRING,
      supplier_landmark: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      supplier_mobile: DataTypes.BIGINT,
      supplier_email: DataTypes.STRING,
      gstin: DataTypes.STRING,
      cin: DataTypes.STRING,
      pan: DataTypes.STRING,
      note: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseSupplierDetail.associate = function(models) {
    // associations can be defined here
  };
  return warehouseSupplierDetail;
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
