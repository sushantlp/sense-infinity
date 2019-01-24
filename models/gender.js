'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var gender = sequelize.define(
    'gender',
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  gender.associate = function(models) {
    // associations can be defined here
  };
  return gender;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Into Gender
module.exports.keepGender = async (name, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = 'INSERT INTO `genders` (`name`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?)';

    // Query Database
    const row = await connection.execute(query, [name, status, now, now]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Gender Record
module.exports.readGenderRecord = async (select, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM genders WHERE status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
