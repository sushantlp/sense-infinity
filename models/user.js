"use strict";

const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      email_active: DataTypes.BOOLEAN,
      mobile_active: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return User;
};

/**
 * Start Database Read and Write
 */

// Get User Table Record
// module.exports.getUserRecord = (mobile, role, status) => {
//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       "SELECT * FROM `Users` WHERE `mobile`=? AND `role_id`=? AND `status`=?",
//       [mobile, role, status],
//       function(err, row) {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(row);
//       }
//     );
//   });
// };

// Read User Table Record
module.exports.readUserRecord = async (select, mobile, role, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM users WHERE mobile=? AND role_id=? AND status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      mobile,
      role,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
