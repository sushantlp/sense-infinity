'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var couponSubType = sequelize.define('coupon_sub_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  couponSubType.associate = function(models) {
    // associations can be defined here
  };
  return couponSubType;
};


/**
 * Start Database Read and Write
 */


// Read Sub Coupon Type List
module.exports.readSubCouponType = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM coupon_sub_types WHERE status = ?`;

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