'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var couponType = sequelize.define('coupon_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  couponType.associate = function(models) {
    // associations can be defined here
  };
  return couponType;
};


/**
 * Start Database Read and Write
 */


// Read Coupon Type List
module.exports.readCouponType = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM coupon_types WHERE status = ?`;

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