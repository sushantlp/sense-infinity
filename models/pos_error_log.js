"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var pos_error_log = sequelize.define(
    "pos_error_log",
    {
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      error_message: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  pos_error_log.associate = function(models) {
    // associations can be defined here
  };
  return pos_error_log;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Pos Error Log
module.exports.keepPosErrorLog = async (
  partnerId,
  storeId,
  errorMessage,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `pos_error_logs` (`partner_id`, `store_id`, `error_message`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      storeId,
      errorMessage,
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
