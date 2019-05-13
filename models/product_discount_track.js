'use strict';
module.exports = (sequelize, DataTypes) => {
  var productDiscountTrack = sequelize.define('product_discount_track', {
    store_id: DataTypes.INTEGER,
    product_discount_id: DataTypes.INTEGER,
    track_status: DataTypes.BOOLEAN
  }, {});
  productDiscountTrack.associate = function(models) {
    // associations can be defined here
  };
  return productDiscountTrack;
};