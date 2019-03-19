'use strict';
module.exports = (sequelize, DataTypes) => {
  var order_status = sequelize.define('order_status', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  order_status.associate = function(models) {
    // associations can be defined here
  };
  return order_status;
};