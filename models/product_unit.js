'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_unit = sequelize.define('product_unit', {
    firstName: DataTypes.STRING
  }, {});
  product_unit.associate = function(models) {
    // associations can be defined here
  };
  return product_unit;
};