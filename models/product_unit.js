'use strict';
module.exports = (sequelize, DataTypes) => {
  var productUnit = sequelize.define('product_unit', {
    product_unit_name: DataTypes.STRING,
    product_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  productUnit.associate = function(models) {
    // associations can be defined here
  };
  return productUnit;
};