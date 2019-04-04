'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var systemAdministratorPassword = sequelize.define('system_administrator_password', {
    warehouse_role_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  systemAdministratorPassword.associate = function(models) {
    // associations can be defined here
  };
  return systemAdministratorPassword;
};


/**
 * Start Database Read and Write
 */

// Read System Password Administrator
module.exports.readSystemPassword = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM system_administrator_passwords WHERE status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */