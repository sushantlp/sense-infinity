"use strict";
module.exports = (sequelize, DataTypes) => {
  var returnInvoice = sequelize.define(
    "return_invoice",
    {
      invoice_no: DataTypes.INTEGER,
      new_invoice_no: DataTypes.INTEGER,
      warehouse_user_id: DataTypes.INTEGER,
      partner_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      reason: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  returnInvoice.associate = function(models) {
    // associations can be defined here
  };
  return returnInvoice;
};
