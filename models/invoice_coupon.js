'use strict';
module.exports = (sequelize, DataTypes) => {
  var invoice_coupon = sequelize.define('invoice_coupon', {
    invoice_no: DataTypes.INTEGER,
    coupon_code: DataTypes.INTEGER,
    applicable_on: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    cashback: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
  }, {});
  invoice_coupon.associate = function(models) {
    // associations can be defined here
  };
  return invoice_coupon;
};