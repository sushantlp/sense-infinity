'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var taxSync = sequelize.define('tax_sync', {
    partner_id: DataTypes.INTEGER,
    attributes: DataTypes.JSON,
    status: DataTypes.BOOLEAN
  }, {});
  taxSync.associate = function(models) {
    // associations can be defined here
  };
  return taxSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Tax Sync Record
module.exports.readTaxSync = async(select, partnerId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM tax_syncs WHERE partner_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [partnerId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Status Tax Sync Record
module.exports.updateStatusTaxSync = async(
  status, id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `tax_syncs` SET `status` = ?, `updated_at` = ? WHERE `tax_sync_id` = ?";

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

// Keep Tax Sync
module.exports.keepTaxSync = async(
  partnerId,
  attribute,
  status,
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `tax_syncs` (`partner_id`, `attributes`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

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

// Update Tax Sync Record
module.exports.updateTaxSync = async(
  attribute, id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `tax_syncs` SET `attributes` = ?, `updated_at` = ? WHERE `tax_sync_id` = ?";

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