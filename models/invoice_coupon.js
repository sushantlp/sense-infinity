"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var invoiceCoupon = sequelize.define(
    "invoice_coupon",
    {
      invoice_no: DataTypes.INTEGER,
      coupon_code: DataTypes.BIGINT,
      applicable_on: DataTypes.STRING,
      discount: DataTypes.DECIMAL,
      cashback: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  invoiceCoupon.associate = function(models) {
    // associations can be defined here
  };
  return invoiceCoupon;
};
