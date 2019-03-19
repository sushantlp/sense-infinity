'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_sub_type = sequelize.define('coupon_sub_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  coupon_sub_type.associate = function(models) {
    // associations can be defined here
  };
  return coupon_sub_type;
};