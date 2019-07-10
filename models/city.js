'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var city = sequelize.define(
    'city', {
      city_name: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      country_code: DataTypes.STRING,
      currency_hex_code: DataTypes.STRING,
      currency_text: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    }, {}
  );
  city.associate = function(models) {
    // associations can be defined here
  };
  return city;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read City Record
module.exports.readCityRecord = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM cities WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Read City Record By City Id
module.exports.readCityBYId = async(select, cityId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM cities WHERE city_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [cityId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */