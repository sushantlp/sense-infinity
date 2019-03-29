'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var stapleProduct = sequelize.define('staple_product', {
    product_name: DataTypes.STRING,
    product_brand_name: DataTypes.STRING,
    product_description: DataTypes.STRING,
    global_category_id: DataTypes.INTEGER,
    global_sub_category_id: DataTypes.INTEGER,
    global_sub_sub_category_id: DataTypes.INTEGER,
    sgst: DataTypes.FLOAT,
    cgst: DataTypes.FLOAT,
    igst: DataTypes.FLOAT,
    change_status: DataTypes.BOOLEAN,
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


// Read Staple Product And Size
module.exports.readProductAndSize = async(select, changeStatus) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM staple_products LEFT JOIN staple_product_sizes ON staple_products.staple_product_id = staple_product_sizes.staple_product_id WHERE staple_products.change_status = ? AND staple_product_sizes.change_status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [changeStatus, changeStatus]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Staple Product
module.exports.keepStapleProduct = async(
  productName,
  brandName,
  description,
  categoryId,
  subCategoryId,
  subSubCategoryId,
  sgst,
  cgst,
  igst,
  changeStatus,
  status,
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `staple_products` (`product_name`,`product_brand_name`,`product_description`,`global_category_id`,`global_sub_category_id`,`global_sub_sub_category_id`,`sgst`,`cgst`,`igst`,`change_status`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      productName,
      brandName,
      description,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      sgst,
      cgst,
      igst,
      changeStatus,
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

// Update Staple Product
module.exports.updateStapleProduct = async(
  productName,
  brandName,
  description,
  categoryId,
  subCategoryId,
  subSubCategoryId,
  sgst,
  cgst,
  igst,
  changeStatus,
  id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `staple_products` SET `product_name` = ?, `product_brand_name` = ?, `product_description` = ?, `global_category_id` = ?, `global_sub_category_id` = ?, `global_sub_sub_category_id` = ?, `sgst` = ?, `cgst` = ?, `igst` = ?, `change_status` = ?, `updated_at` = ? WHERE `staple_product_id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      productName,
      brandName,
      description,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      sgst,
      cgst,
      igst,
      changeStatus,
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