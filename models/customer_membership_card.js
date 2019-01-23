'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var CustomerMembershipCard = sequelize.define(
    'customer_membership_card',
    {
      customer_mobile: DataTypes.STRING,
      membership_card_number: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  CustomerMembershipCard.associate = function(models) {
    // associations can be defined here
  };
  return CustomerMembershipCard;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Customer Membership Card
module.exports.keepCustomerMembershipCard = async (mobile, card, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      'INSERT INTO `customer_membership_cards` (`customer_mobile`, `membership_card_number`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)';

    // Query Database
    const row = await connection.execute(query, [mobile, card, status, now, now]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Membership Card Record By Mobile
module.exports.readMembershipCardMobile = async (select, mobile, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM customer_membership_cards WHERE customer_mobile = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [mobile, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Membership Card Record By Number
module.exports.readMembershipCardNumber = async (select, cardNumber, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM customer_membership_cards WHERE membership_card_number = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [cardNumber, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
