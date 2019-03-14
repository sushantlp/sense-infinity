'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_sub_unit = sequelize.define('product_sub_unit', {
    product_sub_unit_name: DataTypes.STRING,
    product_sub_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  product_sub_unit.associate = function(models) {
    // associations can be defined here
  };
  return product_sub_unit;
};