"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var gender = sequelize.define(
    "gender",
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
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Into Gender
module.exports.keepGender = async (name, status) => {
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
      "INSERT INTO `genders` (`name`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?)";

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
/*

// Get All Gender Record
module.exports.getAllGender = status => {
  // Query
  const query =
    "SELECT gender_id AS gender_unique, name AS gender_name FROM `Genders` WHERE `status`=?";

  return new Promise(function(resolve, reject) {
    mysqlObject.execute(query, [status], function(err, row) {
      if (err) {
        return reject(err);
      }
      return resolve(row);
    });
  });
}; */

/**
 * End Database Read and Write
 */
