'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partnerProductSync = sequelize.define('partner_product_sync', {
    partner_id: DataTypes.INTEGER,
    attributes: DataTypes.JSON
  }, {});
  partnerProductSync.associate = function(models) {
    // associations can be defined here
  };
  return partnerProductSync;
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
    const query = `SELECT ${select} FROM partner_product_syncs WHERE partner_id = ? ORDER BY sync_id ${sorting} LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [partnerId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Partner Product Sync Record
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
      "INSERT INTO `partner_product_syncs` (`partner_id`, `attributes`, `created_at`, `updated_at`) VALUES (?,?,?,?)";

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

// Update Attributes Partner Product Sync Record
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
      "UPDATE `partner_product_syncs` SET `attributes` = ?, `updated_at` = ? WHERE `sync_id` = ?";

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