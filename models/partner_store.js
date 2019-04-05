'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partnerStore = sequelize.define(
    'partner_store', {
      partner_id: DataTypes.INTEGER,
      store_code: DataTypes.INTEGER,
      store_name: DataTypes.STRING,
      address_one: DataTypes.TEXT,
      address_two: DataTypes.TEXT,
      landmark: DataTypes.TEXT,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      gstin_no: DataTypes.STRING,
      store_mobile: DataTypes.STRING,
      store_email: DataTypes.STRING,
      refund_on_discount: DataTypes.BOOLEAN,
      refund_policy: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      sense: DataTypes.BOOLEAN
    }, {}
  );
  partnerStore.associate = function(models) {
    // associations can be defined here
  };
  return partnerStore;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Partner Store Record
module.exports.readStoreRecord = async(select, partnerId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_stores WHERE partner_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [partnerId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Store Record By Store Id
module.exports.readStoreById = async(select, storeId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_stores WHERE store_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [storeId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Partner Store Record By Store Code
module.exports.readStoreByCode = async(select, code, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM partner_stores WHERE store_code = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [code, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Partner Stores Data
module.exports.keepStoreData = async(
  storeCode,
  partnerId,
  storeName,
  addressOne,
  addressTwo,
  landmark,
  cityId,
  localityId,
  storeMobile,
  storeEmail,
  refundDiscount,
  refundPolicy,
  status
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (storeName === undefined) storeName = connection.escape(storeName);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (storeEmail === undefined) storeEmail = connection.escape(storeEmail);
    if (refundPolicy === undefined) refundPolicy = connection.escape(refundPolicy);

    // Query
    const query =
      "INSERT INTO `partner_stores` (`store_code`,`partner_id`,`store_name`,`address_one`,`address_two`,`landmark`,`city_id`,`locality_id`,`store_mobile`,`store_email`,`refund_on_discount`,`refund_policy`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      storeCode,
      partnerId,
      storeName,
      addressOne,
      addressTwo,
      landmark,
      cityId,
      localityId,
      storeMobile,
      storeEmail,
      refundDiscount,
      refundPolicy,
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

// Update Partner Store Data
module.exports.updateStoreData = async(
  storeId,
  storeName,
  addressOne,
  addressTwo,
  landmark,
  cityId,
  localityId,
  storeMobile,
  storeEmail,
  refundDiscount,
  refundPolicy
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (storeName === undefined) storeName = connection.escape(storeName);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (storeEmail === undefined) storeEmail = connection.escape(storeEmail);
    if (refundPolicy === undefined) refundPolicy = connection.escape(refundPolicy);


    // Query
    const query =
      "UPDATE `partner_stores` SET `store_name` = ?, `address_one` = ?, `address_two` = ?, `landmark` = ?, `city_id` = ?, `locality_id` = ?, `store_mobile` = ?, `store_email` = ?, `refund_on_discount` = ?, `refund_policy` = ?, `updated_at` = ? WHERE `store_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      storeName,
      addressOne,
      addressTwo,
      landmark,
      cityId,
      localityId,
      storeMobile,
      storeEmail,
      refundDiscount,
      refundPolicy,
      now,
      storeId
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