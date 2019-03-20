'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var storeOrder = sequelize.define('store_order', {
    store_order_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    store_order_id: DataTypes.INTEGER,
    warehouse_user_id: DataTypes.INTEGER,
    order_status: DataTypes.BOOLEAN
  }, {});
  storeOrder.associate = function(models) {
    // associations can be defined here
  };
  return storeOrder;
};