'use strict';
module.exports = (sequelize, DataTypes) => {
  var storeOrderDetail = sequelize.define('store_order_detail', {
    store_order_id: DataTypes.INTEGER,
    barcode: DataTypes.BIGINT,
    product_name: DataTypes.STRING,
    unit: DataTypes.STRING,
    request_quantity: DataTypes.STRING,
    received_quantity: DataTypes.STRING,
    order_status: DataTypes.BOOLEAN
  }, {});
  storeOrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return storeOrderDetail;
};