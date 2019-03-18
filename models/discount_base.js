'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var discountBase = sequelize.define('discount_base', {
    discount_base_type: DataTypes.STRING,
    discount_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  discountBase.associate = function(models) {
    // associations can be defined here
  };
  return discountBase;
};


/**
 * Start Database Read and Write
 */


// Read Discount Base
module.exports.readDiscountBase = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM discount_bases WHERE status = ?`;

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