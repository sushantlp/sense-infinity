"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseStock = sequelize.define(
    "warehouse_stock",
    {
      partner_id: DataTypes.INTEGER,
      barcode: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      track_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseStock.associate = function(models) {
    // associations can be defined here
  };
  return warehouseStock;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Warehouse Stock Record Search By [partner_id, barcode]
module.exports.readWarehouseStockByBarcode = async (
  select,
  partnerId,
  barcode
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_stocks WHERE partner_id = ? AND barcode = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [partnerId, barcode]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Stocks
module.exports.keepWarehouseStock = async (
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
      "INSERT INTO `warehouse_stocks` (`partner_id`, `barcode`, `quantity`, `track_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?)";

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

// Update Warehouse Stock By [id]
module.exports.updateWarehouseStock = async (
  quantity,
  status,
  trackStatus,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `warehouse_stocks` SET `quantity` = ?, `status` = ?, `track_status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      quantity,
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

/**
 * End Database Read and Write
 */
