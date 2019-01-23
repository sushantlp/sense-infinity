'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var storeComplain = sequelize.define(
    'store_complain',
    {
      cust_identity_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      merchant_id: DataTypes.INTEGER,
      complain: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeComplain.associate = function(models) {
    // associations can be defined here
  };
  return storeComplain;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Store Complain Record
module.exports.readStoreComplain = async (select, storeId, merchantId, customerId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM store_complains WHERE store_id = ? AND cust_identity_id = ? AND merchant_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [storeId, customerId, merchantId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Store Complain
module.exports.keepStoreComplain = async (customerId, merchantId, storeId, desc, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      'INSERT INTO `store_complains` (`cust_identity_id`,`merchant_id`,`store_id`,`complain`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)';

    // Query Database
    const row = await connection.execute(query, [
      customerId,
      merchantId,
      storeId,
      connection.escape(desc),
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    console.log('keepStoreComplain');
    return Promise.reject(error);
  }
};

// Update Merchant Store Complain
module.exports.updateStoreComplain = async (complainId, description, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = 'UPDATE `store_complains` SET complain = ?, status = ?, updated_at = ? WHERE complain_id = ?';

    // Query Database
    const row = await connection.execute(query, [connection.escape(description), status, now, complainId]);

    connection.close();

    return row;
  } catch (error) {
    console.log('updateStoreComplain');
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
