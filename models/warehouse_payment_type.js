'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehousePaymentType = sequelize.define('warehouse_payment_type', {
    payment_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehousePaymentType.associate = function(models) {
    // associations can be defined here
  };
  return warehousePaymentType;
};


/**
 * Start Database Read and Write
 */


// Read Warehouse Payment Type
module.exports.readPaymentType = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_payment_types WHERE status = ?`;

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