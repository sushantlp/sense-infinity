"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var productDiscountTrack = sequelize.define(
    "product_discount_track",
    {
      store_id: DataTypes.INTEGER,
      product_discount_id: DataTypes.INTEGER,
      track_status: DataTypes.BOOLEAN
    },
    {}
  );
  productDiscountTrack.associate = function(models) {
    // associations can be defined here
  };
  return productDiscountTrack;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Product Discount Track
module.exports.readProductDiscountTrack = async (
  select,
  storeId,
  trackStatus
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_discount_tracks WHERE store_id = ? AND track_status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      storeId,
      trackStatus
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Product Discount Track
module.exports.keepProductDiscountTrack = async(
  storeId,
  discountId,
  trackStatus
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `product_discount_tracks` (`store_id`, `product_discount_id`, `track_status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      storeId,
      discountId,
      trackStatuss
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Product Discount Track
module.exports.updateProductDiscountTrack = async(
  trackStatus,
  id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `product_discount_tracks` SET `track_status` = ?, `updated_at` = ? WHERE `product_discount_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      trackStatus,
      now,
      id
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */
