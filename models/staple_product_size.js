'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var stapleProductSize = sequelize.define('staple_product_size', {
    staple_product_id: DataTypes.INTEGER,
    product_barcode: DataTypes.BIGINT,
    product_unit_id: DataTypes.INTEGER,
    product_sub_unit_id: DataTypes.INTEGER,
    product_unit_size: DataTypes.FLOAT,
    product_selling_mrp: DataTypes.FLOAT,
    product_margin: DataTypes.FLOAT,
    product_mrp: DataTypes.FLOAT,
    change_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  stapleProductSize.associate = function(models) {
    // associations can be defined here
  };
  return stapleProductSize;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */

// Keep Staple Product Size
module.exports.keepStapleProductSize = async(
  barcode,
  productId,
  unitId,
  subUnitId,
  unitSize,
  sellingMrp,
  productMargin,
  productMrp,
  changeStatus,
  status,
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "INSERT INTO `staple_product_sizes` (`product_barcode`, `staple_product_id`, `product_unit_id`, `product_sub_unit_id`, `product_unit_size`, `product_selling_mrp`, `product_margin`, `product_mrp`, `change_status`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      barcode,
      productId,
      unitId,
      subUnitId,
      unitSize,
      sellingMrp,
      productMargin,
      productMrp,
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

// Update Staple Product Size
module.exports.updateStapleProductSize = async(
  barcode,
  productId,
  unitId,
  subUnitId,
  unitSize,
  sellingMrp,
  productMargin,
  productMrp,
  changeStatus,
  id
) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query =
      "UPDATE `staple_product_sizes` SET `product_barcode` = ?, `staple_product_id` = ?, `product_unit_id` = ?, `product_sub_unit_id` = ?, `product_unit_size` = ?, `product_selling_mrp` = ?, `product_margin` = ?, `product_mrp` = ?, `change_status` = ?, `updated_at` = ? WHERE `staple_product_size_id` = ?";

    // Query Database
    const row = await connection.execute(query, [
      barcode,
      productId,
      unitId,
      subUnitId,
      unitSize,
      sellingMrp,
      productMargin,
      productMrp,
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