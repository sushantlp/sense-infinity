'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var stapleProductSync = sequelize.define('staple_product_sync', {
    partner_id: DataTypes.INTEGER,
    attributes: DataTypes.JSON,
    status: DataTypes.BOOLEAN
  }, {});
  stapleProductSync.associate = function(models) {
    // associations can be defined here
  };
  return stapleProductSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */

// Read Staple Product Sync Record
module.exports.readStapleProductSync = async(select, partnerId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM staple_product_syncs WHERE partner_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [partnerId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Status Tax Sync Record
module.exports.updateStatusProductSync = async(
  status, id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `staple_product_syncs` SET `status` = ?, `updated_at` = ? WHERE `staple_product_sync_id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      status,
      now,
      id
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Staple Product Sync Record
module.exports.keepStapleProductSync = async(
  partnerId,
  attribute,
  status,
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `staple_product_syncs` (`partner_id`, `attributes`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      partnerId,
      attribute,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Staple Product Sync Record
module.exports.updateStapleProductSync = async(
  attribute, id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `staple_product_syncs` SET `attributes` = ?, `updated_at` = ? WHERE `staple_product_sync_id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      attributes,
      now,
      id
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */