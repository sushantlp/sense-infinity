'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partnerStoreProductSync = sequelize.define('partner_store_product_sync', {
    partner_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    attributes: DataTypes.JSON,
    status: DataTypes.BOOLEAN
  }, {});
  partnerStoreProductSync.associate = function(models) {
    // associations can be defined here
  };
  return partnerStoreProductSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */

// Read Partner Store Product Sync Record
module.exports.readStoreProductSync = async(select, partnerId, storeId status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_store_product_syncs WHERE partner_id = ? AND store_id = ? AND status = ? ORDER BY sync_id DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [partnerId, storeId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Status Partner Store Product Sync Record
module.exports.updateStatustSync = async(
  status, id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `partner_store_product_syncs` SET `status` = ?, `updated_at` = ? WHERE `sync_id` = ?";

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

// Keep Partner Store Product Sync Record
module.exports.keepStoreProductSync = async(
  partnerId,
  storeId,
  attribute,
  status,
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `partner_store_product_syncs` (`partner_id`, `store_id`, `attributes`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      storeId,
      attribute,
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

// Update Attributes Partner Store Product Sync Record
module.exports.updateAttributesSync = async(
  attribute, id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `partner_store_product_syncs` SET `attributes` = ?, `updated_at` = ? WHERE `sync_id` = ?";

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