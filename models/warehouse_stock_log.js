"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseStockLog = sequelize.define(
    "warehouse_stock_log",
    {
      partner_id: DataTypes.INTEGER,
      barcode: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      track_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseStockLog.associate = function(models) {
    // associations can be defined here
  };
  return warehouseStockLog;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Warehouse Stocks Log
module.exports.keepWarehouseStockLog = async (
  partnerId,
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
      "INSERT INTO `warehouse_stock_logs` (`partner_id`, `barcode`, `quantity`, `track_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
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
