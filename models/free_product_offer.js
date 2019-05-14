"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var freeProductOffer = sequelize.define(
    "free_product_offer",
    {
      free_product_id: DataTypes.INTEGER,
      product_discount_id: DataTypes.INTEGER,
      buy_product_barcode: DataTypes.BIGINT,
      buy_product_quantity: DataTypes.INTEGER,
      free_product_barcode: DataTypes.BIGINT,
      free_product_quantity: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  freeProductOffer.associate = function(models) {
    // associations can be defined here
  };
  return freeProductOffer;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Free Product Offer By Product Discount Id
module.exports.readFreeOffer = async (select, discountId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM free_product_offers WHERE product_discount_id = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [discountId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Free Product Offer
module.exports.keepFreeOffer = async (
  freeId,
  discountId,
  buyProduct,
  buyQuantity,
  freeProduct,
  freeQuantity,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `free_product_offers` (`free_product_id`, `product_discount_id`, `buy_product_barcode`, `buy_product_quantity`, `free_product_barcode`, `free_product_quantity`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      freeId,
      discountId,
      buyProduct,
      buyQuantity,
      freeProduct,
      freeQuantity,
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

// Update Free Product Offer
module.exports.updateFreeOffer = async (status, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `free_product_offers` SET `status` = ?, `updated_at` = ? WHERE `product_discount_id` = ?";

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
