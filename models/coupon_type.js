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

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM coupon_types WHERE status = ?`;

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