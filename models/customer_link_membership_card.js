"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const customer_link_membership_card = sequelize.define(
    "customer_link_membership_card",
    {
      customer_information_id: DataTypes.INTEGER.UNSIGNED,
      membership_card_id: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  customer_link_membership_card.associate = function(models) {
    // associations can be defined here
  };
  return customer_link_membership_card;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Membership Card Owner By [membership_card_id, status]
module.exports.readCardOwner = async (select, cardId, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_link_membership_cards WHERE membership_card_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [cardId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Membership Card Owner By [customer_information_id, membership_card_id, status]
module.exports.readCustomerCard = async (
  select,
  customerId,
  cardId,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_link_membership_cards WHERE customer_information_id = ? AND membership_card_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      customerId,
      cardId,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Link Between Customer And Membership Card
module.exports.keepLinkCustomerMembershipCard = async (
  customerId,
  cardId,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `customer_link_membership_cards` (`customer_information_id`, `membership_card_id`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      customerId,
      cardId,
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
