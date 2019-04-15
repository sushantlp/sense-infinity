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

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_units WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Product Unit List
module.exports.readProductUnitName = async(select, name, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_units WHERE product_unit_name = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [name, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */