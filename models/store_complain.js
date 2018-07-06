"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var store_complain = sequelize.define(
    "store_complain",
    {
      cust_identity_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      merchant_id: DataTypes.INTEGER,
      complain: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  store_complain.associate = function(models) {
    // associations can be defined here
  };
  return store_complain;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Store Complain Record
module.exports.readStoreComplain = async (
  select,
  storeId,
  merchantId,
  customerId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM store_complains store_id=? AND cust_identity_id=? AND merchant_id=? AND status=? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      storeId,
      customerId,
      merchantId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Store Complain
module.exports.keepStoreComplain = async (
  customerId,
  merchantId,
  storeId,
  desc,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "INSERT INTO `store_complains` (`cust_identity_id`,`merchant_id`,`store_id`,`complain`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      customerId,
      merchantId,
      storeId,
      desc,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Merchant Store Complain
module.exports.updateStoreComplain = async (
  complainId,
  description,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "UPDATE `store_complains` SET `complain`=?,`status`=?,`updated_at`=? WHERE `complain_id`=?";

    // Query Database
    const row = await connection.execute(query, [
      complainId,
      description,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
