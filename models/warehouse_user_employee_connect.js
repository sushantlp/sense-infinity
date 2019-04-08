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

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_employee_connects WHERE warehouse_user_id = ? AND warehouse_employe_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [userId, employeId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse User And Employee Connect
module.exports.readUserEmployeeConnectStatus = async(select, userId, employeId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_employee_connects WHERE warehouse_user_id = ? AND warehouse_employe_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [userId, employeId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Join Warehouse Biller Data
module.exports.readBillerByJoin = async(select, partnerId, storeId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_lists
    LEFT JOIN warehouse_user_employee_connects ON warehouse_user_lists.id = warehouse_user_employee_connects.warehouse_user_id
    RIGHT JOIN warehouse_employee_lists ON warehouse_user_employee_connects.warehouse_employe_id = warehouse_employee_lists.id
    WHERE
        warehouse_user_employee_connects.status = ?
    AND warehouse_user_lists.status = ?
    AND warehouse_employee_lists.status = ?
    AND warehouse_user_lists.warehouse_role_id <> 1 
    OR warehouse_employee_lists.store_id = ?
    OR warehouse_user_lists.partner_id = ? `;

    // Query Database
    const [rows, fields] = await connection.query(query, [status, status, status, storeId, partnerId]);

    connection.release();

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

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `warehouse_user_employee_connects` (`warehouse_user_id`,`warehouse_employe_id`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      userId,
      employeId,
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

// Update Warehouse User And Employee Connect
module.exports.updateUserEmployeeConnect = async(
  status,
  id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `warehouse_user_employee_connects` SET `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      status,
      now,
      id
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