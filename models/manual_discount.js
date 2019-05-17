"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var manualDiscount = sequelize.define(
    "manual_discount",
    {
      store_id: DataTypes.INTEGER,
      warehouse_user_id: DataTypes.INTEGER,
      invoice_no: DataTypes.INTEGER,
      discount_amount: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  manualDiscount.associate = function(models) {
    // associations can be defined here
  };
  return manualDiscount;
};
