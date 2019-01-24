'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var deviceDetail = sequelize.define(
    'device_detail',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  );
  deviceDetail.associate = function(models) {
    // associations can be defined here
  };
  return deviceDetail;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

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
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      'INSERT INTO `device_details` (`mobile`,`store_id`,`longitude`,`latitude`,`brand`,`device`,`model`,`app_id`,`version_sdk`,`version_release`,`sense_version_number`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

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
