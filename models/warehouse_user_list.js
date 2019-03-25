'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseUserList = sequelize.define('warehouse_user_list', {
    warehouse_user_id: DataTypes.INTEGER,
    warehouse_role_id: DataTypes.INTEGER,
    warehouse_employe_id: DataTypes.INTEGER,
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
module.exports.readWarehouseUserByUserId = async(select, userId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_lists WHERE warehouse_user_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [userId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse User By Id
module.exports.readWarehouseUserById = async(select, Id, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_user_lists WHERE id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [Id, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse User Data
module.exports.keepWarehouseUserData = async(
  userId,
  roleId,
  employeId,
  partnerId,
  password,
  status
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `warehouse_user_lists` (`warehouse_user_id`,`warehouse_role_id`,`warehouse_employe_id`,`partner_id`,`password`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      userId,
      roleId,
      employeId,
      partnerId,
      password,
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

// Update Warehouse User Data
module.exports.updateWarehouseUserPassword = async(
  password,
  id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `warehouse_user_lists` SET `password` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      password,
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