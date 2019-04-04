'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var discountType = sequelize.define('discount_type', {
    discount_type: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  discountType.associate = function(models) {
    // associations can be defined here
  };
  return discountType;
};


/**
 * Start Database Read and Write
 */


// Read Discount Type
module.exports.readDiscountType = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM discount_types WHERE status = ?`;

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