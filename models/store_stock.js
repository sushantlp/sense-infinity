"use strict";

const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const storeStock = sequelize.define(
    "store_stock",
    {
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      barcode: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      track_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeStock.associate = function(models) {
    // associations can be defined here
  };
  return storeStock;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Store Stock Record Search By [partner_id, store_id, barcode]
module.exports.readStockSearchByBracode = async (
  select,
  partnerId,
  storeId,
  barcode
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM store_stocks WHERE partner_id = ? AND store_id = ? AND barcode = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      storeId,
      barcode
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Store Stock Record for Warehouse Search By [partner_id, track_status, status]
module.exports.readStockForWarehouse = async (
  select,
  partnerId,
  trackStatus,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM store_stocks WHERE partner_id = ? AND track_status = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      trackStatus,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Track Status [track_status, partner_id]
module.exports.stockTrackStatus = async (trackStatus, partnerId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `store_stocks` SET `track_status` = ?, `updated_at` = ? WHERE `partner_id` = ?";

    // Query Database
    const row = await connection.query(query, [trackStatus, now, partnerId]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Store Stock By [id]
module.exports.updateStoreStock = async (quantity, status, trackStatus, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `invoices` SET `store_stocks` = ?, `quantity` = ?, `status` = ?, `track_status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      quantity,
      returnStatus,
      status,
      trackStatus,
      now,
      id
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Store Stocks
module.exports.keepStoreStock = async (
  partnerId,
  storeId,
  barcode,
  quantity,
  trackStatus,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `store_stocks` (`partner_id`, `store_id`, `barcode`, `quantity`, `track_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      storeId,
      barcode,
      quantity,
      trackStatus,
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
