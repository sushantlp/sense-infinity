"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var invoiceProduct = sequelize.define(
    "invoice_product",
    {
      invoice_no: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_barcode: DataTypes.BIGINT,
      product_unit: DataTypes.STRING,
      product_quantity: DataTypes.INTEGER,
      product_sgst: DataTypes.FLOAT,
      product_cgst: DataTypes.FLOAT,
      product_igst: DataTypes.FLOAT,
      product_price: DataTypes.DECIMAL,
      product_discount: DataTypes.FLOAT,
      product_discount_price: DataTypes.DECIMAL,
      product_sub_total: DataTypes.DECIMAL,
      return_status: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  invoiceProduct.associate = function(models) {
    // associations can be defined here
  };
  return invoiceProduct;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Stores Invoice Product
module.exports.keepInvoiceProduct = async (
  invoiceNo,
  productName,
  productBarcode,
  productUnit,
  productQuantity,
  productSgst,
  productCgst,
  productIgst,
  productPrice,
  productDiscount,
  productDiscountPrice,
  productSubTotal,
  returnStatus,
  status
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `invoice_products` (`invoice_no`, `product_name`, `product_barcode`, `product_unit`, `product_quantity`, `product_sgst`, `product_cgst`, `product_igst`, `product_price`, `product_discount`, `product_discount_price`, `product_sub_total`, `return_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      invoiceNo,
      productName,
      productBarcode,
      productUnit,
      productQuantity,
      productSgst,
      productCgst,
      productIgst,
      productPrice,
      productDiscount,
      productDiscountPrice,
      productSubTotal,
      returnStatus,
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

// Update Invoice Product By [id]
module.exports.updateInvoiceProduct = async (
  productName,
  productBarcode,
  productUnit,
  productQuantity,
  productSgst,
  productCgst,
  productIgst,
  productPrice,
  productDiscount,
  productDiscountPrice,
  productSubTotal,
  returnStatus,
  status,
  id
) => {
  try {
    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "UPDATE `invoice_products` SET `product_name` = ?, `product_barcode` = ?, `product_unit` = ?, `product_quantity` = ?, `product_sgst` = ?, `product_cgst` = ?, `product_igst` = ?, `product_price` = ?, `product_discount` = ?, `product_discount_price` = ?, `product_sub_total` = ?, `return_status` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?";

    // Query Database
    const row = await connection.query(query, [
      productName,
      productBarcode,
      productUnit,
      productQuantity,
      productSgst,
      productCgst,
      productIgst,
      productPrice,
      productDiscount,
      productDiscountPrice,
      productSubTotal,
      returnStatus,
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
