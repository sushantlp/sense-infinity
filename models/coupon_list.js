'use strict';
module.exports = (sequelize, DataTypes) => {
  var couponList = sequelize.define('coupon_list', {
    coupon_code: DataTypes.BIGINT,
    expiry: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {});
  couponList.associate = function(models) {
    // associations can be defined here
  };
  return couponList;
};