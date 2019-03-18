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
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM discount_types WHERE status = ?`;

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