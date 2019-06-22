"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const storeSupplierDetail = sequelize.define(
    "store_supplier_detail",
    {
      supplier_id: DataTypes.INTEGER.UNSIGNED,
      store_id: DataTypes.INTEGER,
      supplier_name: DataTypes.STRING,
      supplier_address_one: DataTypes.STRING,
      supplier_address_two: DataTypes.STRING,
      supplier_landmark: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      supplier_mobile: DataTypes.BIGINT,
      supplier_email: DataTypes.STRING,
      gstin: DataTypes.STRING,
      cin: DataTypes.STRING,
      pan: DataTypes.STRING,
      note: DataTypes.TEXT,
      track_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeSupplierDetail.associate = function(models) {
    // associations can be defined here
  };
  return storeSupplierDetail;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Store Supplier Record Search By [store_id, supplier_id]
module.exports.readStoreSupplier = async (select, storeId, supplierId) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM store_supplier_details WHERE store_id = ? AND supplier_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [storeId, supplierId]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Store Supplier Record Search By [partner_id, track_status]
module.exports.readStoreSupplierById = async (
  select,
  partnerId,
  trackStatus
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM store_supplier_details LEFT JOIN partner_stores ON store_supplier_details.store_id = partner_stores.store_id WHERE partner_stores.partner_id = ? AND store_supplier_details.track_status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      trackStatus
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Store Supplier
module.exports.keepStoreSupplier = async (
  supplierId,
  storeId,
  supplierName,
  addressOne,
  addressTwo,
  landmark,
  state,
  city,
  country,
  pincode,
  mobile,
  email,
  gstin,
  cin,
  pan,
  note,
  trackStatus,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (state === undefined) state = connection.escape(state);
    if (city === undefined) city = connection.escape(city);
    if (country === undefined) country = connection.escape(country);
    if (email === undefined) email = connection.escape(email);
    if (gstin === undefined) gstin = connection.escape(gstin);
    if (cin === undefined) cin = connection.escape(cin);
    if (pan === undefined) pan = connection.escape(pan);
    if (note === undefined) note = connection.escape(note);

    // Query
    const query =
      "INSERT INTO `store_supplier_details` (`supplier_id`, `store_id`, `supplier_name`, `supplier_address_one`, `supplier_address_two`, `supplier_landmark`, `state`, `city`, `country`, `pincode`, `supplier_mobile`, `supplier_email`, `gstin`, `cin`, `pan`, `note`, `track_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      supplierId,
      storeId,
      supplierName,
      addressOne,
      addressTwo,
      landmark,
      state,
      city,
      country,
      pincode,
      mobile,
      email,
      gstin,
      cin,
      pan,
      note,
      trackStatus,
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

// Update Store Supplier By [id]
module.exports.updateStoreSupplier = async (
  supplierName,
  addressOne,
  addressTwo,
  landmark,
  state,
  city,
  country,
  pincode,
  mobile,
  email,
  gstin,
  cin,
  pan,
  note,
  trackStatus,
  status,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (addressOne === undefined) addressOne = connection.escape(addressOne);
    if (addressTwo === undefined) addressTwo = connection.escape(addressTwo);
    if (landmark === undefined) landmark = connection.escape(landmark);
    if (state === undefined) state = connection.escape(state);
    if (city === undefined) city = connection.escape(city);
    if (country === undefined) country = connection.escape(country);
    if (email === undefined) email = connection.escape(email);
    if (gstin === undefined) gstin = connection.escape(gstin);
    if (cin === undefined) cin = connection.escape(cin);
    if (pan === undefined) pan = connection.escape(pan);
    if (note === undefined) note = connection.escape(note);

    // Query
    const query =
      "UPDATE `store_supplier_details` SET `supplier_name` = ?, `supplier_address_one` = ?, `supplier_address_two` = ?, `supplier_landmark` = ?, `state` = ?, `city` = ?, `country` = ?, `pincode` = ?, `supplier_mobile` = ?, `supplier_email` = ?, `gstin` = ?, `cin` = ?, `pan` = ?, `note` = ?, `track_status` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      supplierName,
      addressOne,
      addressTwo,
      landmark,
      state,
      city,
      country,
      pincode,
      mobile,
      email,
      gstin,
      cin,
      pan,
      note,
      trackStatus,
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

// Track Status Change Store Supplier Detail By [store_id, invoice_number]
module.exports.changeTrackStatusSupplierDetail = async (
  trackStatus,
  startId,
  lastId
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `store_supplier_details` SET `track_status` = ?, `updated_at` = ? WHERE `id` >= ? AND `id` <= ?";

    // Query Database
    const row = await connection.query(query, [
      trackStatus,
      now,
      startId,
      lastId
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
