'use strict';
module.exports = (sequelize, DataTypes) => {
  var staple_product_size = sequelize.define('staple_product_size', {
    product_barcode: DataTypes.BIGINT,
    product_unit_id: DataTypes.INTEGER,
    product_sub_unit_id: DataTypes.INTEGER,
    product_unit_size: DataTypes.FLOAT,
    product_selling_mrp: DataTypes.FLOAT,
    product_margin: DataTypes.FLOAT,
    product_mrp: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  staple_product_size.associate = function(models) {
    // associations can be defined here
  };
  return staple_product_size;
};