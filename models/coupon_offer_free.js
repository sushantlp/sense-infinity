'use strict';
module.exports = (sequelize, DataTypes) => {
  var couponOfferFree = sequelize.define('coupon_offer_free', {
    coupon_offer_id: DataTypes.INTEGER,
    barcode: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  couponOfferFree.associate = function(models) {
    // associations can be defined here
  };
  return couponOfferFree;
};