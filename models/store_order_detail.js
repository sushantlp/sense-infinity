'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_order_detail = sequelize.define('store_order_detail', {
    firstName: DataTypes.STRING
  }, {});
  store_order_detail.associate = function(models) {
    // associations can be defined here
  };
  return store_order_detail;
};