'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var invoiceProduct = sequelize.define('invoice_product', {
    invoice_no: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_barcode: DataTypes.BIGINT,
    product_unit: DataTypes.STRING,
    product_quantity: DataTypes.FLOAT,
    product_sgst: DataTypes.FLOAT,
    product_cgst: DataTypes.FLOAT,
    product_igst: DataTypes.FLOAT,
    product_price: DataTypes.FLOAT,
    product_discount: DataTypes.FLOAT,
    product_discount_price: DataTypes.FLOAT,
    product_sub_total: DataTypes.FLOAT,
    return_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  invoiceProduct.associate = function(models) {
    // associations can be defined here
  };
  return invoiceProduct;
};