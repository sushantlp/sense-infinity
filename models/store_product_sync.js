'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var storeProductSync = sequelize.define('store_product_sync', {
    sync_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  storeProductSync.associate = function(models) {
    // associations can be defined here
  };
  return storeProductSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Store Product Sync Record
module.exports.readProductSync = async(select, storeId, syncId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM store_product_syncs WHERE store_id = ? AND sync_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [storeId, syncId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Store Product Sync Record
module.exports.keepProductSync = async(
  storeId, syncId, status
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `store_product_syncs` (`sync_id`, `store_id`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      storeId, syncId, status,
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Status Store Product Sync Record
module.exports.updateStatusSync = async(
  status, id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `store_product_syncs` SET `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
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