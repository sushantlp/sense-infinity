'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var invoice = sequelize.define('invoice', {
    invoice_no: DataTypes.INTEGER,
    store_counter_id: DataTypes.INTEGER,
    warehouse_user_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    customer_mobile: DataTypes.INTEGER,
    membership_code: DataTypes.BIGINT,
    total_amount: DataTypes.FLOAT,
    invoice_cashback: DataTypes.FLOAT,
    invoice_total_saving: DataTypes.FLOAT,
    invoice_loyalty_used: DataTypes.FLOAT,
    invoice_total_amount: DataTypes.FLOAT,
    gstin_name: DataTypes.STRING,
    gstin_number: DataTypes.STRING,
    return_status: DataTypes.BOOLEAN,
    round_off_amount: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
  };
  return invoice;
};