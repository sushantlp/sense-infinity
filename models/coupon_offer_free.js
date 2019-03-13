'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_offer_free = sequelize.define('coupon_offer_free', {
    coupon_offer_id: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  coupon_offer_free.associate = function(models) {
    // associations can be defined here
  };
  return coupon_offer_free;
};