'use strict';
module.exports = (sequelize, DataTypes) => {
  var discount_type = sequelize.define('discount_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  discount_type.associate = function(models) {
    // associations can be defined here
  };
  return discount_type;
};