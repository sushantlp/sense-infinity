'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_offer_value = sequelize.define('coupon_offer_value', {
    coupon_offer_id: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  coupon_offer_value.associate = function(models) {
    // associations can be defined here
  };
  return coupon_offer_value;
};