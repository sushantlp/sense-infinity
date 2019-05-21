"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var loginHistory = sequelize.define(
    "login_history",
    {
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      store_counter_id: DataTypes.INTEGER,
      warehouse_user_id: DataTypes.INTEGER,
      login_time: DataTypes.STRING,
      logout_time: DataTypes.STRING,
      opening_amount: DataTypes.DECIMAL,
      closing_amount: DataTypes.DECIMAL,
      total_invoice: DataTypes.DECIMAL,
      cash_amount: DataTypes.DECIMAL,
      card_amount: DataTypes.DECIMAL,
      sodexo_amount: DataTypes.DECIMAL,
      total_amount: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  loginHistory.associate = function(models) {
    // associations can be defined here
  };
  return loginHistory;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Stores Invoice Coupon
module.exports.keepLoginHistory = async (
  partnerId,
  storeId,
  counterId,
  userId,
  loginTime,
  logoutTime,
  openingAmount,
  closingAmount,
  totalInvoice,
  cashAmount,
  cardAmount,
  sodexoAmount,
  totalAmount,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (loginTime === undefined) loginTime = connection.escape(loginTime);
    if (logoutTime === undefined) logoutTime = connection.escape(logoutTime);

    // Query
    const query =
      "INSERT INTO `invoice_coupons` (`partner_id`, `store_id`, `store_counter_id`, `warehouse_user_id`, `login_time`, `logout_time`, `opening_amount`, `closing_amount`, `total_invoice`, `cash_amount`, `card_amount`, `sodexo_amount`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      storeId,
      counterId,
      userId,
      loginTime,
      logoutTime,
      openingAmount,
      closingAmount,
      totalInvoice,
      cashAmount,
      cardAmount,
      sodexoAmount,
      totalAmount,
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

/**
 * End Database Read and Write
 */
