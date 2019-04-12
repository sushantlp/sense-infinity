'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var stapleProduct = sequelize.define('staple_product', {
    product_name: DataTypes.STRING,
    product_barcode: DataTypes.BIGINT,
    brand_name: DataTypes.STRING,
    description: DataTypes.STRING,
    global_category_id: DataTypes.INTEGER,
    global_sub_category_id: DataTypes.INTEGER,
    global_sub_sub_category_id: DataTypes.INTEGER,
    product_unit_id: DataTypes.INTEGER,
    product_sub_unit_id: DataTypes.INTEGER,
    product_size: DataTypes.INTEGER,
    selling_price: DataTypes.FLOAT,
    product_margin: DataTypes.FLOAT,
    actual_price: DataTypes.FLOAT,
    sgst: DataTypes.FLOAT,
    cgst: DataTypes.FLOAT,
    igst: DataTypes.FLOAT,
    hsn: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  stapleProduct.associate = function(models) {
    // associations can be defined here
  };
  return stapleProduct;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Staple Product By Barcode
module.exports.readProductByBarcode = async(select, barcode) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM staple_products WHERE product_barcode = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [barcode]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Staple Product
module.exports.keepStapleProduct = async(
  productName,
  productBarcode,
  brandName,
  description,
  categoryId,
  subCategoryId,
  subSubCategoryId,
  unitId,
  subUnitId,
  productSize,
  sellingPrice,
  productMargin,
  actualPrice,
  sgst,
  cgst,
  igst,
  hsn,
  status,
) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query =
      "INSERT INTO `staple_products` (`product_name`,`product_barcode`,`brand_name`,`description`,`global_category_id`,`global_sub_category_id`,`global_sub_sub_category_id`,`product_unit_id`,`product_sub_unit_id`,`product_size`,`selling_price`,`product_margin`,`actual_price`,`sgst`,`cgst`,`igst`,`hsn`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.query(query, [
      productName,
      productBarcode,
      brandName,
      description,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      unitId,
      subUnitId,
      productSize,
      sellingPrice,
      productMargin,
      actualPrice,
      sgst,
      cgst,
      igst,
      hsn,
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

// Update Staple Product
module.exports.updateStapleProduct = async(
  productName,
  productBarcode,
  brandName,
  description,
  categoryId,
  subCategoryId,
  subSubCategoryId,
  unitId,
  subUnitId,
  productSize,
  sellingPrice,
  productMargin,
  actualPrice,
  sgst,
  cgst,
  igst,
  hsn,
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
      "UPDATE `staple_products` SET `product_name` = ?, `product_barcode` = ?, `brand_name` = ?, `description` = ?, `global_category_id` = ?, `global_sub_category_id` = ?, `global_sub_sub_category_id` = ?, `product_unit_id` = ?, `product_sub_unit_id` = ?, `product_size` = ?, `selling_price` = ?, `product_margin` = ?, `actual_price` = ?, `sgst` = ?, `cgst` = ?, `igst` = ?, `hsn` = ?, status` = ?, `updated_at` = ? WHERE `staple_product_id` = ?";

    // Query Database
    const row = await connection.query(query, [
      productName,
      productBarcode,
      brandName,
      description,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      unitId,
      subUnitId,
      productSize,
      sellingPrice,
      productMargin,
      actualPrice,
      sgst,
      cgst,
      igst,
      hsn,
      status,
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