'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partnerLinkCustomer = sequelize.define(
    'partner_link_customer', {
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      customer_information_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    }, {}
  );
  partnerLinkCustomer.associate = function(models) {
    // associations can be defined here
  };
  return partnerLinkCustomer;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Merchant Link Customer
module.exports.keepMerchantLinkCustomer = async(merchantId, storeId, customerInformationId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      'INSERT INTO `partner_link_customers` (`partner_id`,`store_id`,`customer_information_id`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?)';

    // Query Database
    const row = await connection.query(query, [merchantId, storeId, customerInformationId, status, now, now]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Link Customer
module.exports.readMerchantLinkCustomer = async(select, merchantId, storeId, customerInformationId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_link_customers WHERE partner_id = ? AND store_id = ? AND customer_information_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [merchantId, storeId, customerInformationId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read All Merchant Store Customer Record
module.exports.readMerchantStoreCustomer = async(select, merchantId, storeId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_link_customers LEFT JOIN customer_information_data ON partner_link_customers.customer_information_id = customer_information_data.customer_information_id LEFT JOIN genders ON customer_information_data.gender_id = genders.gender_id LEFT JOIN cities ON customer_information_data.city_id = cities.city_id LEFT JOIN localities ON customer_information_data.locality_id = localities.locality_id LEFT JOIN customer_membership_cards ON customer_information_data.customer_information_id = customer_membership_cards.customer_information_id WHERE partner_link_customers.partner_id = ? AND partner_link_customers.store_id = ? AND partner_link_customers.status = ? AND customer_information_data.status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [merchantId, storeId, status, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */