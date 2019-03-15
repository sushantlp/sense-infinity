'use strict';
module.exports = (sequelize, DataTypes) => {
  var stapleProduct = sequelize.define('staple_product', {
    product_barcode: DataTypes.BIGINT,
    product_name: DataTypes.STRING,
    product_brand_name: DataTypes.STRING,
    global_category_id: DataTypes.INTEGER,
    global_sub_category_id: DataTypes.INTEGER,
    global_sub_sub_category_id: DataTypes.INTEGER,
    product_unit_id: DataTypes.INTEGER,
    product_sub_unit_id: DataTypes.INTEGER,
    product_unit_size: DataTypes.FLOAT,
    product_selling_mrp: DataTypes.FLOAT,
    product_margin: DataTypes.FLOAT,
    product_mrp: DataTypes.FLOAT,
    sgst: DataTypes.FLOAT,
    cgst: DataTypes.FLOAT,
    igst: DataTypes.FLOAT,
    product_description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  stapleProduct.associate = function(models) {
    // associations can be defined here
  };
  return stapleProduct;
};