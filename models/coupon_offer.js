'use strict';
module.exports = (sequelize, DataTypes) => {
  var coupon_offer = sequelize.define('coupon_offer', {
    offer_static_id: DataTypes.INTEGER,
    coupon_id: DataTypes.INTEGER,
    customer_information_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  coupon_offer.associate = function(models) {
    // associations can be defined here
  };
  return coupon_offer;
};