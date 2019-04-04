'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var productSubUnit = sequelize.define('product_sub_unit', {
    product_sub_unit_name: DataTypes.STRING,
    product_sub_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  productSubUnit.associate = function(models) {
    // associations can be defined here
  };
  return productSubUnit;
};


/**
 * Start Database Read and Write
 */


// Read Product Sub Unit List
module.exports.readProductSubUnit = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_sub_units WHERE status = ?`;

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