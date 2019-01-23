'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var merchant = sequelize.define(
    'merchant',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      business_name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      category_id: DataTypes.INTEGER,
      manager_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  merchant.associate = function(models) {
    // associations can be defined here
  };
  return merchant;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Merchant Record
module.exports.readMerchantByMobile = async (select, mobile, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM merchants WHERE mobile = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [mobile, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
