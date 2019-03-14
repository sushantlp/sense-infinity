'use strict';
module.exports = (sequelize, DataTypes) => {
  var invoice_product = sequelize.define('invoice_product', {
    invoice_no: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_barcode: DataTypes.STRING,
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
  invoice_product.associate = function(models) {
    // associations can be defined here
  };
  return invoice_product;
};