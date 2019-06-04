"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var membershipCard = sequelize.define(
    "membership_card",
    {
      membership_card_number: DataTypes.BIGINT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  membershipCard.associate = function(models) {
    // associations can be defined here
  };
  return membershipCard;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Membership Card
module.exports.readMembershipCard = async (select, card, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM membership_cards WHERE membership_card_number = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [card, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Membership Between Card [id-id]
module.exports.readMembershipBetween = async (select, start, end, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM membership_cards WHERE id <= AND id >=  AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [start, end, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
