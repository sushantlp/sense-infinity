"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var customerInformationData = sequelize.define(
    "customer_information_data",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.BIGINT,
      country_code: DataTypes.STRING,
      dob: DataTypes.STRING,
      gender_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      married: DataTypes.BOOLEAN,
      address_one: DataTypes.STRING,
      address_two: DataTypes.STRING,
      landmark: DataTypes.STRING,
      spouse_name: DataTypes.STRING,
      anniversary_date: DataTypes.STRING,
      reward_point: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  customerInformationData.associate = function(models) {
    // associations can be defined here
  };
  return customerInformationData;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Customer Information Data By Customer Information Id
module.exports.readCustomerDataId = async (select, id, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_information_data WHERE customer_information_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [id, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Customer Information Data By Mobile
module.exports.readCustomerDataMobile = async (select, mobile, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_information_data WHERE mobile = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [mobile, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Customer Information Data by Mobile and Country Code
module.exports.readDataMobileCode = async (select, mobile, code, status) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_information_data WHERE mobile = ? AND country_code = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      mobile,
      code,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Customer Detail And Membership Card
module.exports.readCustomerByLimit = async (
  select,
  lowerLimit,
  upperLimit,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM customer_information_data LEFT JOIN customer_link_membership_cards ON customer_link_membership_cards.customer_information_id = customer_information_data.customer_information_id LEFT JOIN membership_cards ON customer_link_membership_cards.membership_card_id = membership_cards.id WHERE customer_information_data.status = ? AND membership_cards.status = ? AND customer_link_membership_cards.status LIMIT ${lowerLimit},${upperLimit}`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      status,
      status,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Customer Information Data
module.exports.keepCustomerData = async (
  firstName,
  lastName,
  email,
  mobile,
  countryCode,
  dob,
  genderId,
  cityId,
  localityId,
  married,
  addressOne,
  addressTwo,
  landmark,
  spouseName,
  anniversaryDate,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (firstName === undefined) firstName = connection.escape(firstName);
    if (lastName === undefined) lastName = connection.escape(lastName);
    if (email === undefined) email = connection.escape(email);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (spouseName === undefined) spouseName = connection.escape(spouseName);
    if (anniversaryDate === undefined || anniversaryDate === null)
      anniversaryDate = connection.escape(anniversaryDate);

    // Query
    const query =
      "INSERT INTO `customer_information_data` (`first_name`,`last_name`,`email`,`mobile`,`country_code`,`dob`,`gender_id`,`city_id`,`locality_id`,`married`,`address_one`,`address_two`,`landmark`,`spouse_name`,`anniversary_date`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      firstName,
      lastName,
      email,
      mobile,
      countryCode,
      dob,
      genderId,
      cityId,
      localityId,
      married,
      addressOne,
      addressTwo,
      landmark,
      spouseName,
      anniversaryDate,
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

// Update Customer Information Data
module.exports.updateCustomerData = async (
  firstName,
  lastName,
  email,
  dob,
  genderId,
  cityId,
  localityId,
  married,
  addressOne,
  addressTwo,
  landmark,
  spouseName,
  anniversaryDate,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (firstName === undefined) firstName = connection.escape(firstName);
    if (lastName === undefined) lastName = connection.escape(lastName);
    if (email === undefined) email = connection.escape(email);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (spouseName === undefined) spouseName = connection.escape(spouseName);
    if (anniversaryDate === undefined)
      anniversaryDate = connection.escape(anniversaryDate);

    // Query
    const query =
      "UPDATE `customer_information_data` SET `first_name` = ?, `last_name` = ?, `email` = ?, `dob` = ?, `gender_id` = ?, `city_id` = ?, `locality_id` = ?, `married` = ?, `address_one` = ?, `address_two` = ?, `landmark` = ?, `spouse_name` = ?, `anniversary_date` = ?, `updated_at` = ? WHERE `customer_information_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      firstName,
      lastName,
      email,
      dob,
      genderId,
      cityId,
      localityId,
      married,
      addressOne,
      addressTwo,
      landmark,
      spouseName,
      anniversaryDate,
      now,
      id
    ]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Customer Reward Point
module.exports.updateCustomerRewardPoint = async (point, id) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `customer_information_data` SET `reward_point` = ?, `updated_at` = ? WHERE `customer_information_id` = ?";

    // Query Database
    const row = await connection.query(query, [point, now, id]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
