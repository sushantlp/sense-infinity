"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var invoice = sequelize.define(
    "invoice",
    {
      invoice_no: DataTypes.INTEGER,
      store_counter_id: DataTypes.INTEGER,
      warehouse_user_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      partner_id: DataTypes.INTEGER,
      customer_name: DataTypes.STRING,
      customer_mobile: DataTypes.BIGINT,
      membership_code: DataTypes.BIGINT,
      total_amount: DataTypes.DECIMAL,
      invoice_cashback: DataTypes.DECIMAL,
      invoice_total_saving: DataTypes.DECIMAL,
      invoice_loyalty_used: DataTypes.DECIMAL,
      invoice_total_amount: DataTypes.DECIMAL,
      invoice_sodexo_amount: DataTypes.DECIMAL,
      gstin_name: DataTypes.STRING,
      gstin_number: DataTypes.STRING,
      round_off_amount: DataTypes.DECIMAL,
      return_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  invoice.associate = function(models) {
    // associations can be defined here
  };
  return invoice;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Stores Invoice
module.exports.keepInvoice = async (
  billDiscountId,
  storeId,
  discountBaseId,
  name,
  startDate,
  endDate,
  startTime,
  endTime,
  minAmount,
  maxDiscountAmount,
  billOfferValue,
  status,
  trackStatus
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `invoices` (`invoice_no`, `store_counter_id`, `warehouse_user_id`, `store_id`, `partner_id`, `customer_name`, `customer_mobile`, `membership_code`, `total_amount`, `invoice_cashback`, `invoice_total_saving`, `invoice_loyalty_used`, `invoice_total_amount`, `invoice_sodexo_amount`, `gstin_name`, `gstin_number`, `round_off_amount`, `track_status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      billDiscountId,
      storeId,
      discountBaseId,
      name,
      startDate,
      endDate,
      startTime,
      endTime,
      minAmount,
      maxDiscountAmount,
      billOfferValue,
      status,
      trackStatus,
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
