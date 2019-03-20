'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var productUnit = sequelize.define('product_unit', {
    product_unit_name: DataTypes.STRING,
    product_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  productUnit.associate = function(models) {
    // associations can be defined here
  };
  return productUnit;
};


/**
 * Start Database Read and Write
 */


// Read Product Unit List
module.exports.readProductUnit = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM product_units WHERE status = ?`;

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