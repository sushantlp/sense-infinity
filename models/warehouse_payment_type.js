'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehousePaymentType = sequelize.define('warehouse_payment_type', {
    payment_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehousePaymentType.associate = function(models) {
    // associations can be defined here
  };
  return warehousePaymentType;
};