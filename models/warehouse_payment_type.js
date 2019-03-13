'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_payment_type = sequelize.define('warehouse_payment_type', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  warehouse_payment_type.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_payment_type;
};