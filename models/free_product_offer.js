'use strict';
module.exports = (sequelize, DataTypes) => {
  var freeProductOffer = sequelize.define('free_product_offer', {
    product_discount_id: DataTypes.INTEGER,
    buy_product_barcode: DataTypes.BIGINT,
    buy_product_quantity: DataTypes.INTEGER,
    free_product_barcode: DataTypes.BIGINT,
    free_product_quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {});
  freeProductOffer.associate = function(models) {
    // associations can be defined here
  };
  return freeProductOffer;
};