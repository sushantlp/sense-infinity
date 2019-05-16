"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var productDiscount = sequelize.define(
    "product_discount",
    {
      partner_id: DataTypes.INTEGER,
      product_discount_id: DataTypes.INTEGER,
      discount_base_id: DataTypes.INTEGER,
      product_discount_name: DataTypes.STRING,
      name: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  productDiscount.associate = function(models) {
    // associations can be defined here
  };
  return productDiscount;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Product Discount By [product_discount_id, partner_id]
module.exports.readProductDiscount = async (select, discountId, partnerId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_discounts WHERE product_discount_id = ? AND partner_id = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      discountId,
      partnerId
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Product Discount By Array [id]
module.exports.readProductDiscountArray = async (
  select,
  questionMarks,
  idArray
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM product_discounts WHERE id IN (${questionMarks})`;

    // Query Database
    const [rows, fields] = await connection.query(query, idArray);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Product Discount
module.exports.keepProductDiscount = async (
  partnerId,
  discountId,
  baseId,
  discountName,
  startDate,
  endDate,
  startTime,
  endTime,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `product_discounts` (`partner_id`, `product_discount_id`, `discount_base_id`, `name`, `start_date`, `end_date`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      discountId,
      baseId,
      discountName,
      startDate,
      endDate,
      startTime,
      endTime,
      status,
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Product Discount
module.exports.updateProductDiscount = async (status, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `product_discounts` SET `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [status, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
