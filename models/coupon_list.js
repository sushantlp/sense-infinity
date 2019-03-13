'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_list = sequelize.define('coupon_list', {
    coupon_code: DataTypes.INTEGER,
    expiry: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {});
  coupon_list.associate = function(models) {
    // associations can be defined here
  };
  return coupon_list;
};