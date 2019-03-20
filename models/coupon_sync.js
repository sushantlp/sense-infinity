'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var couponSync = sequelize.define('coupon_sync', {
    partner_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    coupon_start_id: DataTypes.INTEGER,
    coupon_end_id: DataTypes.INTEGER,
    sync_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  couponSync.associate = function(models) {
    // associations can be defined here
  };
  return couponSync;
};