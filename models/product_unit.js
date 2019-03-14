'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_unit = sequelize.define('product_unit', {
    product_unit_name: DataTypes.STRING,
    product_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  product_unit.associate = function(models) {
    // associations can be defined here
  };
  return product_unit;
};