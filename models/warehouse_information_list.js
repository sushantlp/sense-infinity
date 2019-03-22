'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseInformationList = sequelize.define('warehouse_information_list', {
    warehouse_information_id: DataTypes.INTEGER,
    partner_id: DataTypes.INTEGER,
    business_name: DataTypes.STRING,
    address_one: DataTypes.STRING,
    address_two: DataTypes.STRING,
    landmark: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    locality_id: DataTypes.INTEGER,
    gstin: DataTypes.STRING,
    cin: DataTypes.STRING,
    pan: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseInformationList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseInformationList;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Warehouse Data By Code
module.exports.readWarehouseDataByCode = async(select, code, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_information_lists WHERE warehouse_information_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [code, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Keep Customer Information Data
module.exports.keepWarehouseData = async(
  id,
  partnerId,
  businessName,
  addressOne,
  addressTwo,
  landmark,
  cityId,
  localityId,
  gstin,
  cin,
  pan,
  mobile,
  email,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    if (businessName === undefined) businessName = connection.escape(businessName);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (gstin === undefined) gstin = connection.escape(gstin);
    if (cin === undefined) cin = connection.escape(cin);
    if (pan === undefined) pan = connection.escape(pan);
    if (email === undefined) email = connection.escape(email);


    // Query
    const query =
      "INSERT INTO `warehouse_information_lists` (`warehouse_information_id`,`partner_id`,`business_name`,`address_one`,`address_two`,`landmark`,`city_id`,`locality_id`,`gstin`,`cin`,`pan`,`mobile`,`email`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      id,
      partnerId,
      businessName,
      addressOne,
      addressTwo,
      landmark,
      cityId,
      localityId,
      gstin,
      cin,
      pan,
      mobile,
      email,
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

// Update Customer Information Data
module.exports.updateWarehouseData = async(
  id,
  businessName,
  addressOne,
  addressTwo,
  landmark,
  cityId,
  localityId,
  gstin,
  cin,
  pan,
  mobile,
  email,
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    if (businessName === undefined) businessName = connection.escape(businessName);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (gstin === undefined) gstin = connection.escape(gstin);
    if (cin === undefined) cin = connection.escape(cin);
    if (pan === undefined) pan = connection.escape(pan);
    if (email === undefined) email = connection.escape(email);


    // Query
    const query =
      "UPDATE `warehouse_information_lists` SET `business_name` = ?, `address_one` = ?, `address_two` = ?, `landmark` = ?, `city_id` = ?, `locality_id` = ?, `gstin` = ?, `cin` = ?, `pan` = ?, `mobile` = ?, `email` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      businessName,
      addressOne,
      addressTwo,
      landmark,
      cityId,
      localityId,
      gstin,
      cin,
      pan,
      mobile,
      email,
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