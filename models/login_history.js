'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var loginHistory = sequelize.define('login_history', {
    store_id: DataTypes.INTEGER,
    store_counter_id: DataTypes.INTEGER,
    warehouse_user_id: DataTypes.INTEGER,
    login_time: DataTypes.TIME,
    logout_time: DataTypes.TIME,
    opening_amount: DataTypes.FLOAT,
    closing_amount: DataTypes.FLOAT,
    total_invoice: DataTypes.FLOAT,
    cash_amount: DataTypes.FLOAT,
    card_amount: DataTypes.FLOAT,
    sodexo_amount: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  loginHistory.associate = function(models) {
    // associations can be defined here
  };
  return loginHistory;
};