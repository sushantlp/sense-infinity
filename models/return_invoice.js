"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var returnInvoice = sequelize.define(
    "return_invoice",
    {
      invoice_no: DataTypes.INTEGER.UNSIGNED,
      new_invoice_no: DataTypes.INTEGER.UNSIGNED,
      warehouse_user_id: DataTypes.INTEGER.UNSIGNED,
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      reason: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      track_status: DataTypes.BOOLEAN
    },
    {}
  );
  returnInvoice.associate = function(models) {
    // associations can be defined here
  };
  return returnInvoice;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Return Invoice [partner_id, track_status]
module.exports.readReturnInvoiceByPartner = async (
  select,
  partnerId,
  trackStatus
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM return_invoices LEFT JOIN partner_stores ON return_invoices.store_id = partner_stores.store_id WHERE return_invoices.partner_id = ? AND return_invoices.track_status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      trackStatus
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Return Invoice By [id]
module.exports.readReturnInvoice = async (
  select,
  invoiceNo,
  newInvoiceNo,
  partnerId,
  storeId
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM return_invoices WHERE invoice_no = ? AND new_invoice_no = ? AND partner_id = ? AND store_id = ? `;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      invoiceNo,
      newInvoiceNo,
      partnerId,
      storeId
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Stores Return Invoice
module.exports.keepReturnInvoice = async (
  invoiceNo,
  newInvoiceNo,
  warehouseUserId,
  partnerId,
  storeId,
  reason,
  status,
  trackStatus
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (reason === undefined) reason = connection.escape(reason);

    // Query
    const query =
      "INSERT INTO `return_invoices` (`invoice_no`, `new_invoice_no`, `warehouse_user_id`, `partner_id`, `store_id`, `reason`, `status`, `track_status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      invoiceNo,
      newInvoiceNo,
      warehouseUserId,
      partnerId,
      storeId,
      reason,
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

// Update Return Invoice [id]
module.exports.updateReturnInvoice = async (
  newInvoiceNo,
  reason,
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
      "UPDATE `return_invoices` SET `new_invoice_no` = ?, `reason` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      newInvoiceNo,
      reason,
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

// Update Return Invoice [track_status, partner_id]
module.exports.returnInvoiceTrackStatus = async (trackStatus, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `return_invoices` SET `track_status` = ?, `updated_at` = ? WHERE `partner_id` = ?";

    // Query Database
    const row = await connection.query(query, [trackStatus, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
