"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var billDiscount = sequelize.define(
    "bill_discount",
    {
      bill_discount_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      discount_base_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      min_amount: DataTypes.DECIMAL,
      max_discount_amount: DataTypes.DECIMAL,
      bill_offer_value: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN,
      track_status: DataTypes.BOOLEAN
    },
    {}
  );
  billDiscount.associate = function(models) {
    // associations can be defined here
  };
  return billDiscount;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Bill Discount Specific Store [store_id,track_status]
module.exports.readBillDiscount = async (select, storeId, trackStatus) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM bill_discounts WHERE store_id = ? AND track_status = ?`;

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

// Read Bill Discount Specific By [bill_discount_Id,store_id]
module.exports.readBillDiscountById = async (select, discountId, storeId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM bill_discounts WHERE bill_discount_id = ? AND store_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [discountId, storeId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Bill Discount
module.exports.keepBillDiscount = async (
  billDiscountId,
  storeId,
  discountBaseId,
  name,
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
      "INSERT INTO `bill_discounts` (`bill_discount_id`, `store_id`, `discount_base_id`, `name`, `start_date`, `end_date`, `start_time`, `end_time`, `min_amount`, `max_discount_amount`, `bill_offer_value`, `status`, `track_status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      billDiscountId,
      storeId,
      discountBaseId,
      name,
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
      now
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Warehouse Bill Discount
module.exports.updateBillDiscount = async (status, trackStatus, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `bill_discounts` SET `status` = ?, `track_status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [status, trackStatus, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Bill Discount Track Status By [store_id]
module.exports.updateBillTrack = async (trackStatus, storeId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `bill_discounts` SET `track_status` = ?, `updated_at` = ? WHERE `store_id` = ?";

    // Query Database
    const row = await connection.query(query, [trackStatus, now, storeId]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
