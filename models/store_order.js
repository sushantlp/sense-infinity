'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_order = sequelize.define('store_order', {
    firstName: DataTypes.STRING
  }, {});
  store_order.associate = function(models) {
    // associations can be defined here
  };
  return store_order;
};