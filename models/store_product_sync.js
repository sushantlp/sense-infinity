'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var storeProductSync = sequelize.define('store_product_sync', {
    sync_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  storeProductSync.associate = function(models) {
    // associations can be defined here
  };
  return storeProductSync;
};