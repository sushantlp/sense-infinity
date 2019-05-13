'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var billDiscount = sequelize.define('bill_discount', {
    bill_discount_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    discount_base_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    min_discount_amount: DataTypes.FLOAT,
    max_discount_amount: DataTypes.FLOAT,
    bill_offer_value: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  billDiscount.associate = function(models) {
    // associations can be defined here
  };
  return billDiscount;
};