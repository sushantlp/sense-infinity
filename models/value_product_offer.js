"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var valueProductOffer = sequelize.define(
    "value_product_offer",
    {
      value_product_id: DataTypes.INTEGER,
      product_discount_id: DataTypes.INTEGER,
      product_barcode: DataTypes.BIGINT,
      buy_product_quantity: DataTypes.INTEGER,
      offer_value: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  valueProductOffer.associate = function(models) {
    // associations can be defined here
  };
  return valueProductOffer;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read value Product Offer By Product Discount Id
module.exports.readValueOffer = async (select, discountId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM value_product_offers WHERE product_discount_id = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [discountId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Value Product Offer
module.exports.keepValueOffer = async (
  valueId,
  discountId,
  productBarcode,
  buyQuantity,
  offerValue,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `value_product_offers` (`value_product_id`, `product_discount_id`, `product_barcode`, `buy_product_quantity`, `offer_value`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      valueId,
      discountId,
      productBarcode,
      buyQuantity,
      offerValue,
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

// Update Value Product Offer
module.exports.updateValueOffer = async (status, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `value_product_offers` SET `status` = ?, `updated_at` = ? WHERE `product_discount_id` = ?";

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
