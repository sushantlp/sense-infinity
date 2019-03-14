'use strict';
module.exports = (sequelize, DataTypes) => {
  var manual_discount = sequelize.define('manual_discount', {
    store_id: DataTypes.INTEGER,
    warehouse_user_id: DataTypes.INTEGER,
    invoice_no: DataTypes.INTEGER,
    discount_amount: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  manual_discount.associate = function(models) {
    // associations can be defined here
  };
  return manual_discount;
};