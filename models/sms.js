'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var sms = sequelize.define(
    'sms', {
      mobile: DataTypes.STRING,
      otp: DataTypes.STRING,
      gateway_status: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    }, {}
  );
  sms.associate = function(models) {
    // associations can be defined here
  };
  return sms;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Sms Record
module.exports.keepSmsOtp = async(mobile, otp, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = 'INSERT INTO `sms` (`mobile`, `otp`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)';

    // Query Database
    const row = await connection.query(query, [mobile, otp, status, now, now]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Sms Record
module.exports.updateSmsOtp = async(mobile, gateway, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = 'UPDATE `sms` SET `gateway_status` = ?, `status` = ?, `updated_at` = ? WHERE `mobile` = ?';

    // Query Database
    const row = await connection.query(query, [gateway, status, now, mobile]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Daily Sms Limit
module.exports.dailySmsLimit = async(select, mobile) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM sms WHERE mobile = ? AND date(created_at)=curdate()`;

    // Query Database
    const [rows, fields] = await connection.query(query, [mobile]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Sms Record
module.exports.readSmsRecord = async(select, mobile, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM sms WHERE mobile = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [mobile, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */