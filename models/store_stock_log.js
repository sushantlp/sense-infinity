"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const storeStockLog = sequelize.define(
    "store_stock_log",
    {
      warehouse_user_id: DataTypes.INTEGER.UNSIGNED,
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      barcode: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      track_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeStockLog.associate = function(models) {
    // associations can be defined here
  };
  return storeStockLog;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Store Stocks Log
module.exports.keepStoreStockLog = async (
  userId,
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
      "INSERT INTO `store_stock_logs` (`warehouse_user_id`, `partner_id`, `store_id`, `barcode`, `quantity`, `track_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      userId,
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
