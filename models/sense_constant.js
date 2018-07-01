"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var sense_constant = sequelize.define(
    "sense_constant",
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      comment: DataTypes.STRING,
      complain: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  sense_constant.associate = function(models) {
    // associations can be defined here
  };
  return sense_constant;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Sense Constant Value
module.exports.readSenseConstant = async (select, name, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM sense_constants WHERE name=? AND status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [name, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

//Get Sense Constant Value
// module.exports.getSenseConstant = (name, status) => {
//   const query = "SELECT * FROM `SenseConstants` WHERE `name`=? AND `status`=?";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(query, [name, status], function(err, row) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(row);
//     });
//   });
// };

/**
 * End Database Read and Write
 */
