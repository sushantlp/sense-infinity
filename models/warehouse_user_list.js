'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseUserList = sequelize.define('warehouse_user_list', {
    warehouse_user_id: DataTypes.BIGINT,
    warehouse_role_id: DataTypes.INTEGER,
    partner_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseUserList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseUserList;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Warehouse User By User Id
module.exports.readWarehouseUserByUserId = async(select, userId, partnerId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_lists WHERE warehouse_user_id = ? AND partner_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [userId, partnerId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse User By Id
module.exports.readWarehouseUserById = async(select, Id, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_lists WHERE id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [Id, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse User Data
module.exports.keepWarehouseUserData = async(
  userId,
  roleId,
  partnerId,
  password,
  status
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `warehouse_user_lists` (`warehouse_user_id`,`warehouse_role_id`,`partner_id`,`password`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      userId,
      roleId,
      partnerId,
      password,
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

// Update Warehouse User Password
module.exports.updateWarehouseUserPassword = async(
  password,
  id
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `warehouse_user_lists` SET `password` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [password, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */