'use strict';
module.exports = (sequelize, DataTypes) => {
  var invoicePayment = sequelize.define('invoice_payment', {
    invoice_no: DataTypes.INTEGER,
    warehouse_payment_id: DataTypes.INTEGER,
    payment_amount: DataTypes.FLOAT,
    transaction_id: DataTypes.STRING,
    card_no: DataTypes.STRING,
    store_counter_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  invoice_payment.associate = function(models) {
    // associations can be defined here
  };
  return invoicePayment;
};