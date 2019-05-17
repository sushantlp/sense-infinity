"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var invoicePayment = sequelize.define(
    "invoice_payment",
    {
      invoice_no: DataTypes.INTEGER,
      warehouse_payment_id: DataTypes.INTEGER,
      payment_amount: DataTypes.DECIMAL,
      transaction_id: DataTypes.STRING,
      card_no: DataTypes.BIGINT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  invoicePayment.associate = function(models) {
    // associations can be defined here
  };
  return invoicePayment;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Invoice Payment By [id]
module.exports.readInvoicePayment = async (select, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM invoice_payments WHERE id = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [id]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Stores Invoice Payment
module.exports.keepInvoicePayment = async (
  invoiceNo,
  warehousePaymentId,
  paymentAmount,
  transactionId,
  cardNo,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `invoice_payments` (`invoice_no`, `warehouse_payment_id`, `payment_amount`, `transaction_id`, `card_no`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      invoiceNo,
      warehousePaymentId,
      paymentAmount,
      transactionId,
      cardNo,
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

// Update Invoice Payment By [id]
module.exports.updateInvoicePayment = async (
  warehousePaymentId,
  paymentAmount,
  transactionId,
  cardNo,
  status,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `invoice_payments` SET `warehouse_payment_id` = ?, `payment_amount` = ?, `transaction_id` = ?, `card_no` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      warehousePaymentId,
      paymentAmount,
      transactionId,
      cardNo,
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
