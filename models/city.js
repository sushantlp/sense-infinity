"use strict";

const moment = require("moment-timezone");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var city = sequelize.define(
    "city",
    {
      city_name: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  city.associate = function(models) {
    // associations can be defined here
  };
  return city;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read City Record
module.exports.readCityRecord = async (select, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM cities WHERE status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// // Get All City Record
// module.exports.getAllCity = status => {
//   // Query
//   const query =
//     "SELECT city_id AS city_unique, city_name AS city, longitude AS lon, latitude AS lat FROM `Cities` WHERE `status`=?";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(query, [status], function(err, row) {
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
