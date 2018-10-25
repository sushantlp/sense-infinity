"use strict";

const moment = require("moment-timezone");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var ErrorLog = sequelize.define(
    "error_log",
    {
      error: DataTypes.TEXT,
      value: DataTypes.TEXT
    },
    {
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
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Into Error Log
module.exports.keepErrorLog = async (error, value) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "INSERT INTO `error_logs` (`error`, `value`, `created_at`,`updated_at`) VALUES (?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [error, value, now, now]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
