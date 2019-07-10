'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partner = sequelize.define(
    'partner', {
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
      status: DataTypes.BOOLEAN
    }, {}
  );
  partner.associate = function(models) {
    // associations can be defined here
  };
  return partner;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Partner Record
module.exports.readPartnerByMobile = async(select, mobile, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partners WHERE mobile = ? AND status = ? LIMIT 1`;

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