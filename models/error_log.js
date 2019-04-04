'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var ErrorLog = sequelize.define(
    'error_log', {
      error: DataTypes.TEXT,
      value: DataTypes.TEXT
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return ErrorLog;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Into Error Log
module.exports.keepErrorLog = async(error, value) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = 'INSERT INTO `error_logs` (`error`, `value`, `created_at`,`updated_at`) VALUES (?,?,?,?)';

    // Query Database
    const row = await connection.query(query, [error, value, now, now]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */