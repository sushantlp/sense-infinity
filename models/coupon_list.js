"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var couponList = sequelize.define(
    "coupon_list",
    {
      coupon_code: DataTypes.BIGINT,
      expiry_date: DataTypes.STRING,
      expiry_time: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  couponList.associate = function(models) {
    // associations can be defined here
  };
  return couponList;
};
