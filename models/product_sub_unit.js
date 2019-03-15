'use strict';
module.exports = (sequelize, DataTypes) => {
  var productSubUnit = sequelize.define('product_sub_unit', {
    product_sub_unit_name: DataTypes.STRING,
    product_sub_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  productSubUnit.associate = function(models) {
    // associations can be defined here
  };
  return productSubUnit;
};