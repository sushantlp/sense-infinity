'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_order = sequelize.define('store_order', {
    store_order_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    store_order_id: DataTypes.INTEGER,
    warehouse_user_id: DataTypes.INTEGER,
    order_status: DataTypes.BOOLEAN
  }, {});
  store_order.associate = function(models) {
    // associations can be defined here
  };
  return store_order;
};