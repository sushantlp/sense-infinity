"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var manualDiscount = sequelize.define(
    "manual_discount",
    {
      warehouse_user_id: DataTypes.INTEGER.UNSIGNED,
      invoice_no: DataTypes.INTEGER.UNSIGNED,
      discount_amount: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  manualDiscount.associate = function(models) {
    // associations can be defined here
  };
  return manualDiscount;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Invoice Payment By [invoice_no]
module.exports.readManualDiscountByNo = async (select, invoiceNo) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM manual_discounts WHERE invoice_no = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [invoiceNo]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Stores Invoice Manual Discount
module.exports.keepManualDiscount = async (
  userId,
  invoiceNo,
  discountAmount,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `manual_discounts` (`warehouse_user_id`, `invoice_no`, `discount_amount`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      userId,
      invoiceNo,
      discountAmount,
      status,
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
