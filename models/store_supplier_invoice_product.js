"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const storeSupplierInvoiceProduct = sequelize.define(
    "store_supplier_invoice_product",
    {
      supplier_invoice_id: DataTypes.INTEGER.UNSIGNED,
      product_code: DataTypes.BIGINT,
      product_type: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      hsn_code: DataTypes.INTEGER,
      mrp: DataTypes.DOUBLE,
      quantity: DataTypes.DOUBLE,
      free_quantity: DataTypes.DOUBLE,
      rate: DataTypes.DOUBLE,
      unit_value: DataTypes.DOUBLE,
      unit: DataTypes.STRING,
      pri_sch: DataTypes.DOUBLE,
      sec_sch: DataTypes.DOUBLE,
      spl_disc: DataTypes.DOUBLE,
      cgst: DataTypes.DOUBLE,
      sgst: DataTypes.DOUBLE,
      igst: DataTypes.DOUBLE,
      margin: DataTypes.DOUBLE,
      total_amount: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  storeSupplierInvoiceProduct.associate = function(models) {
    // associations can be defined here
  };
  return storeSupplierInvoiceProduct;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Store Supplier Invoice Product
module.exports.keepStoreSupplierInvoiceProduct = async (
  supplierInvoiceId,
  productCode,
  productType,
  productName,
  hsnCode,
  mrp,
  quantity,
  freeQuantity,
  rate,
  unitValue,
  unit,
  priSch,
  secSch,
  splDisc,
  cgst,
  sgst,
  igst,
  margin,
  totalAmount,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    if (productName === undefined) productName = connection.escape(productName);
    if (unit === undefined) unit = connection.escape(unit);

    // Query
    const query =
      "INSERT INTO `store_supplier_invoice_products` (`supplier_invoice_id`, `product_code`, `product_type`, `product_name`, `hsn_code`, `mrp`, `quantity`, `free_quantity`, `rate`, `unit_value`, `unit`, `pri_sch`, `sec_sch`, `spl_disc`, `cgst`, `sgst`, `igst`, `margin`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      supplierInvoiceId,
      productCode,
      productType,
      productName,
      hsnCode,
      mrp,
      quantity,
      freeQuantity,
      rate,
      unitValue,
      unit,
      priSch,
      secSch,
      splDisc,
      cgst,
      sgst,
      igst,
      margin,
      totalAmount,
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

// Status Change Store Supplier Invoice Product By [supplier_invoice_id]
module.exports.updateStoreSupplierInvoiceProduct = async (
  status,
  supplierInvoiceId
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `store_supplier_invoice_products` SET `status` = ?, `updated_at` = ? WHERE `supplier_invoice_id` = ?";

    // Query Database
    const row = await connection.query(query, [status, now, supplierInvoiceId]);

    connection.release();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
