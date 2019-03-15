'use strict';
module.exports = (sequelize, DataTypes) => {
  var discountType = sequelize.define('discount_type', {
    discount_type: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  discountType.associate = function(models) {
    // associations can be defined here
  };
  return discountType;
};