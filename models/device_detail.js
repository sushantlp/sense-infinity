"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var device_detail = sequelize.define(
    "device_detail",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  );
  device_detail.associate = function(models) {
    // associations can be defined here
  };
  return device_detail;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Device Detail
module.exports.keepDeviceDetail = async (
  mobile,
  storeId,
  longitude,
  latitude,
  brand,
  device,
  model,
  appId,
  versionSdk,
  versionRelease,
  senseVersionNumber
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
      "INSERT INTO `device_details` (`mobile`,`store_id`,`longitude`,`latitude`,`brand`,`device`,`model`,`app_id`,`version_sdk`,`version_release`,`sense_version_number`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      mobile,
      storeId,
      longitude,
      latitude,
      brand,
      device,
      model,
      appId,
      versionSdk,
      versionRelease,
      senseVersionNumber,
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
