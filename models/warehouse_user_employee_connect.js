'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseUserEmployeeConnect = sequelize.define('warehouse_user_employee_connect', {
    warehouse_user_id: DataTypes.INTEGER,
    warehouse_employe_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseUserEmployeeConnect.associate = function(models) {
    // associations can be defined here
  };
  return warehouseUserEmployeeConnect;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Warehouse User And Employee Connect
module.exports.readUserEmployeeConnect = async(select, userId, employeId) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_employee_connects WHERE warehouse_user_id = ? AND warehouse_employe_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [userId, employeId]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse User And Employee Connect
module.exports.readUserEmployeeConnectStatus = async(select, userId, employeId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_employee_connects WHERE warehouse_user_id = ? AND warehouse_employe_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [userId, employeId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse User And Employee Connect
module.exports.keepUserEmployeeConnect = async(
  userId,
  employeId,
  status
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `warehouse_user_employee_connects` (`warehouse_user_id`,`warehouse_employe_id`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      userId,
      employeId,
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

// Update Warehouse User And Employee Connect
module.exports.updateUserEmployeeConnect = async(
  status,
  id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `warehouse_user_employee_connects` SET `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      status,
      now,
      id
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