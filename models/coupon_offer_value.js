'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var couponOfferValue = sequelize.define('coupon_offer_value', {
    coupon_offer_id: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  couponOfferValue.associate = function(models) {
    // associations can be defined here
  };
  return couponOfferValue;
};