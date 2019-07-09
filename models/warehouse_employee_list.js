"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var warehouseEmployeeList = sequelize.define(
    "warehouse_employee_list",
    {
      warehouse_employe_id: DataTypes.BIGINT,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      dept_name: DataTypes.STRING,
      gender_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseEmployeeList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseEmployeeList;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Warehouse Employee By Employee Id
module.exports.readEmployeeByEmployeeId = async (
  select,
  employeeId,
  storeId,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_employee_lists WHERE warehouse_employe_id = ? AND store_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      employeeId,
      storeId,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Warehouse Employee By Id
module.exports.readEmployeeById = async (select, Id, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_employee_lists WHERE id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [Id, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Employee Data
module.exports.keepEmployeeData = async (
  employeId,
  firstName,
  lastName,
  birthDate,
  mobile,
  email,
  deptName,
  genderId,
  storeId,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (birthDate === "Invalid date") birthDate = undefined;
    if (firstName === undefined) firstName = connection.escape(firstName);
    if (lastName === undefined) lastName = connection.escape(lastName);
    if (email === undefined) email = connection.escape(email);
    if (birthDate === undefined) birthDate = connection.escape(birthDate);
    if (deptName === undefined) deptName = connection.escape(deptName);

    // Query
    const query =
      "INSERT INTO `warehouse_employee_lists` (`warehouse_employe_id`, `first_name`, `last_name`, `birth_date`, `mobile`, `email`, `dept_name`, `gender_id`, `store_id`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      employeId,
      firstName,
      lastName,
      birthDate,
      mobile,
      email,
      deptName,
      genderId,
      storeId,
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

// Update Warehouse Employee Data
module.exports.updateEmployeeData = async (
  firstName,
  lastName,
  birthDate,
  mobile,
  email,
  deptName,
  genderId,
  storeId,
  status,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (birthDate === "Invalid date") birthDate = undefined;
    if (firstName === undefined) firstName = connection.escape(firstName);
    if (lastName === undefined) lastName = connection.escape(lastName);
    if (email === undefined) email = connection.escape(email);
    if (birthDate === undefined) birthDate = connection.escape(birthDate);
    if (deptName === undefined) deptName = connection.escape(deptName);

    // Query
    const query =
      "UPDATE `warehouse_employee_lists` SET `first_name` = ?, `last_name` = ?, `birth_date` = ?, `mobile` = ?, `email` = ?, `dept_name` = ?, `gender_id` = ?, `store_id` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      firstName,
      lastName,
      birthDate,
      mobile,
      email,
      deptName,
      genderId,
      storeId,
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
