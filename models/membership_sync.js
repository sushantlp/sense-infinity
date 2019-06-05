"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var membershipSync = sequelize.define(
    "membership_sync",
    {
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      membership_start_id: DataTypes.INTEGER,
      membership_end_id: DataTypes.INTEGER,
      sync_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  membershipSync.associate = function(models) {
    // associations can be defined here
  };
  return membershipSync;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Membership Sync Record By [partner_id, store_id, sync_status, status]
module.exports.readMembershipSync = async (
  select,
  partnerId,
  storeId,
  syncStatus,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM membership_syncs WHERE partner_id = ? AND store_id = ? And sync_status = ? AND status = ? ORDER BY DESC`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      storeId,
      syncStatus,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Membership Sync By [id, sync_status, status]
module.exports.updateMembershipSync = async (syncStatus, status, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `membership_syncs` SET `sync_status` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [syncStatus, status, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
