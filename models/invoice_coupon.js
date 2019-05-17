"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var invoiceCoupon = sequelize.define(
    "invoice_coupon",
    {
      invoice_no: DataTypes.INTEGER,
      coupon_code: DataTypes.BIGINT,
      applicable_on: DataTypes.STRING,
      discount: DataTypes.FLOAT,
      cashback: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  invoiceCoupon.associate = function(models) {
    // associations can be defined here
  };
  return invoiceCoupon;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

 // Read Invoice Coupon By [id]
module.exports.readInvoiceCoupon = async (select, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM invoice_coupons WHERE id = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [id]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Stores Invoice Coupon
module.exports.keepInvoiceCoupon = async (
  invoiceNo,
  couponCode,
  applicableOn,
  discount,
  cashback,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `invoice_coupons` (`invoice_no`, `coupon_code`, `applicable_on`, `discount`, `cashback`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      invoiceNo,
      couponCode,
      applicableOn,
      discount,
      cashback,
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

// Update Invoice Coupon By [id]
module.exports.updateInvoiceCoupon = async (
  couponCode,
  applicableOn,
  discount,
  cashback,
  status
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `invoice_coupons` SET `coupon_code` = ?, `applicable_on` = ?, `discount` = ?, `cashback` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      couponCode,
      applicableOn,
      discount,
      cashback,
      status,
      now,
      id
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
