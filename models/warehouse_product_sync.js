'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseProductSync = sequelize.define('warehouse_product_sync', {
    sync_id: DataTypes.INTEGER,
    partner_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseProductSync.associate = function(models) {
    // associations can be defined here
  };
  return warehouseProductSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Partner Product Sync Record
module.exports.readProductSync = async(select, partnerId, sorting) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_product_syncs WHERE partner_id = ? ORDER BY sync_id ${sorting} LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [partnerId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse Product By Sync Id Record
module.exports.readProductBySyncId = async(select, syncId) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_product_syncs WHERE sync_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [syncId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Product Sync Record
module.exports.keepProductSync = async(
  partnerId,
  attribute
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `warehouse_product_syncs` (`partner_id`, `attributes`, `created_at`, `updated_at`) VALUES (?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      attribute,
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Attributes Warehouse_Product Sync Record
module.exports.updateAttributesSync = async(
  attributes, id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `warehouse_product_syncs` SET `attributes` = ?, `updated_at` = ? WHERE `sync_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      attributes,
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