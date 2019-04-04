'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var orderStatus = sequelize.define('order_status', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  orderStatus.associate = function(models) {
    // associations can be defined here
  };
  return orderStatus;
};


/**
 * Start Database Read and Write
 */


// Read Order Status List
module.exports.readOrderStatus = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM order_statuses WHERE status = ?`;

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