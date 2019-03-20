'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var valueProductOffer = sequelize.define('value_product_offer', {
    product_discount_id: DataTypes.INTEGER,
    product_barcode: DataTypes.BIGINT,
    buy_product_quantity: DataTypes.INTEGER,
    offer_value: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  valueProductOffer.associate = function(models) {
    // associations can be defined here
  };
  return valueProductOffer;
};