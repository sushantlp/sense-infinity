'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var senseConstant = sequelize.define(
    'sense_constant',
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      comment: DataTypes.STRING,
      complain: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  senseConstant.associate = function(models) {
    // associations can be defined here
  };
  return senseConstant;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Sense Constant Record
module.exports.readSenseConstant = async (select, name, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM sense_constants WHERE name = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [name, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
