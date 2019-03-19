'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_type = sequelize.define('coupon_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  coupon_type.associate = function(models) {
    // associations can be defined here
  };
  return coupon_type;
};