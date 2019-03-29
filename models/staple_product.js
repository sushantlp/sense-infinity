'use strict';
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
    status: DataTypes.BOOLEAN
  }, {});
  stapleProduct.associate = function(models) {
    // associations can be defined here
  };
  return stapleProduct;
};