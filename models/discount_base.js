'use strict';
module.exports = (sequelize, DataTypes) => {
  var discount_base = sequelize.define('discount_base', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  discount_base.associate = function(models) {
    // associations can be defined here
  };
  return discount_base;
};