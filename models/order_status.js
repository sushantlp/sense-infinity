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
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM order_statuses WHERE status = ?`;

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