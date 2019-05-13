'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var billDiscount = sequelize.define('bill_discount', {
    bill_discount_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    discount_base_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    min_amount: DataTypes.FLOAT,
    max_discount_amount: DataTypes.FLOAT,
    bill_offer_value: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
    track_status: DataTypes.BOOLEAN
  }, {});
  billDiscount.associate = function(models) {
    // associations can be defined here
  };
  return billDiscount;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


// Keep Warehouse Bill Discount
module.exports.keepBillDiscount = async(
  billDiscountId,
  storeId,
  discountBaseId,
  startDate,
  endDate,
  startTime,
  endTime,
  minAmount,
  maxDiscountAmount,
  billOfferValue,
  status,
  trackStatus
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `bill_discounts` (`bill_discount_id`, `store_id`, `discount_base_id`, `start_date`, `end_date`, `start_time`, `end_time`, `min_amount`, `max_discount_amount`, `bill_offer_value`, `status`, `track_status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      billDiscountId,
      storeId,
      discountBaseId,
      startDate,
      endDate,
      startTime,
      endTime,
      minAmount,
      maxDiscountAmount,
      billOfferValue,
      status,
      trackStatus
      now,
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Update Warehouse Bill Discount
module.exports.updateBillDiscount = async(
  startDate,
  endDate,
  startTime,
  endTime,
  minAmount,
  maxDiscountAmount,
  billOfferValue,
  status,
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
      "UPDATE `bill_discounts` SET `start_date` = ?, `end_date` = ?, `start_time` = ?, `end_time` = ?, `min_amount` = ?, `max_discount_amount` = ?, `bill_offer_value` = ?, `status` = ?, `track_status` = ?, `updated_at` = ? WHERE `bill_discount_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      startDate,
      endDate,
      startTime,
      endTime,
      minAmount,
      maxDiscountAmount,
      billOfferValue,
      status,
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