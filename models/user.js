"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      mobile: DataTypes.BIGINT,
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

// Read User Table Record
module.exports.readUserRecord = async (select, mobile, role, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM users WHERE mobile = ? AND role_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      mobile,
      role,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read User Record By Id
module.exports.readUserById = async (select, id, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM users WHERE user_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [id, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
