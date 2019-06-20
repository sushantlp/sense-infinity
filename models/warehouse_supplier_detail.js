"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseSupplierDetail = sequelize.define(
    "warehouse_supplier_detail",
    {
      supplier_id: DataTypes.INTEGER.UNSIGNED,
      partner_id: DataTypes.INTEGER,
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
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseSupplierDetail.associate = function(models) {
    // associations can be defined here
  };
  return warehouseSupplierDetail;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Warehouse Supplier Record Search By [partner_id, supplier_id]
module.exports.readWarehouseSupplier = async (
  select,
  partnerId,
  supplierId
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_supplier_details WHERE partner_id = ? AND supplier_id = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      supplierId
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Supplier
module.exports.keepWarehouseSupplier = async (
  supplierId,
  partnerId,
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
      "INSERT INTO `warehouse_supplier_details` (`supplier_id`, `partner_id`, `supplier_name`, `supplier_address_one`, `supplier_address_two`, `supplier_landmark`, `state`, `city`, `country`, `pincode`, `supplier_mobile`, `supplier_email`, `gstin`, `cin`, `pan`, `note`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      supplierId,
      partnerId,
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

// Update Warehouse Supplier By [id]
module.exports.updateWarehouseSupplier = async (
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
      "UPDATE `warehouse_supplier_details` SET `supplier_name` = ?, `supplier_address_one` = ?, `supplier_address_two` = ?, `supplier_landmark` = ?, `state` = ?, `city` = ?, `country` = ?, `pincode` = ?, `supplier_mobile` = ?, `supplier_email` = ?, `gstin` = ?, `cin` = ?, `pan` = ?, `note` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

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
