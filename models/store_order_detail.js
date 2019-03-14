'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_order_detail = sequelize.define('store_order_detail', {
    store_order_id: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    product_name: DataTypes.STRING,
    unit: DataTypes.STRING,
    request_quantity: DataTypes.STRING,
    received_quantity: DataTypes.STRING,
    order_status: DataTypes.BOOLEAN
  }, {});
  store_order_detail.associate = function(models) {
    // associations can be defined here
  };
  return store_order_detail;
};