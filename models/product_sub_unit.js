'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_sub_unit = sequelize.define('product_sub_unit', {
    firstName: DataTypes.STRING
  }, {});
  product_sub_unit.associate = function(models) {
    // associations can be defined here
  };
  return product_sub_unit;
};