"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const warehouseSupplierInvoice = sequelize.define(
    "warehouse_supplier_invoice",
    {
      partner_id: DataTypes.INTEGER,
      invoice_number: DataTypes.INTEGER,
      supplier_name: DataTypes.STRING,
      address_one: DataTypes.STRING,
      address_two: DataTypes.STRING,
      landmark: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      mobile: DataTypes.BIGINT,
      email: DataTypes.STRING,
      gstin: DataTypes.STRING,
      cin: DataTypes.STRING,
      pan: DataTypes.STRING,
      note: DataTypes.TEXT,
      inv_no: DataTypes.STRING,
      invoice_date: DataTypes.STRING,
      sn_name: DataTypes.STRING,
      rt_name: DataTypes.STRING,
      sm_phone: DataTypes.BIGINT,
      del_date: DataTypes.STRING,
      invoice_total_amount: DataTypes.DOUBLE,
      payment_status: DataTypes.INTEGER,
      payment_type: DataTypes.STRING,
      payment_date: DataTypes.STRING,
      payment_reference_number: DataTypes.STRING,
      e_way_bill: DataTypes.STRING,
      s_note: DataTypes.STRING,
      warehouse_user_id: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  warehouseSupplierInvoice.associate = function(models) {
    // associations can be defined here
  };
  return warehouseSupplierInvoice;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Warehouse Supplier Invoice Record Search By [partner_id, invoice_number, status]
module.exports.readWarehouseSupplierInvoice = async (
  select,
  partnerId,
  invoiceNo,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_supplier_invoices WHERE partner_id = ? AND invoice_number = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.query(query, [
      partnerId,
      invoiceNo,
      status
    ]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Warehouse Supplier Invoice
module.exports.keepWarehouseSupplierInvoice = async (
  partnerId,
  invoiceNo,
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
  invNo,
  invoiceDate,
  snName,
  rtName,
  smPhone,
  delDate,
  totalAmt,
  paymentStatus,
  paymentType,
  paymentDate,
  paymentReference,
  eWayBill,
  sNote,
  userId,
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
    if (snName === undefined) snName = connection.escape(snName);
    if (rtName === undefined) rtName = connection.escape(rtName);
    if (delDate === undefined) delDate = connection.escape(delDate);
    if (paymentType === undefined) paymentType = connection.escape(paymentType);
    if (paymentDate === undefined) paymentDate = connection.escape(paymentDate);
    if (paymentReference === undefined)
      paymentReference = connection.escape(paymentReference);
    if (eWayBill === undefined) eWayBill = connection.escape(eWayBill);
    if (sNote === undefined) sNote = connection.escape(sNote);

    // Query
    const query =
      "INSERT INTO `warehouse_supplier_invoices` (`partner_id`, `invoice_number`, `supplier_name`, `address_one`, `address_two`, `landmark`, `state`, `city`, `country`, `pincode`, `mobile`, `email`, `gstin`, `cin`, `pan`, `note`, `inv_no`, `invoice_date`, `sn_name`, `rt_name`, `sm_phone`, `del_date`, `invoice_total_amount`, `payment_status`, `payment_type`, `payment_date`, `payment_reference_number`, `e_way_bill`, `s_note`, `warehouse_user_id`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      partnerId,
      invoiceNo,
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
      invNo,
      invoiceDate,
      snName,
      rtName,
      smPhone,
      delDate,
      totalAmt,
      paymentStatus,
      paymentType,
      paymentDate,
      paymentReference,
      eWayBill,
      sNote,
      userId,
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

// Status Change Warehouse Supplier Invoice By [partner_id, invoice_number]
module.exports.updateWarehouseSupplierInvoice = async (
  status,
  partnerId,
  invoiceNo
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `warehouse_supplier_invoices` SET `status` = ?, `updated_at` = ? WHERE `partner_id` = ? AND `invoice_number` = ?";

    // Query Database
    const row = await connection.query(query, [
      status,
      now,
      partnerId,
      invoiceNo
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
