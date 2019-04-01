'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var stapleProductSync = sequelize.define('staple_product_sync', {
    partner_id: DataTypes.INTEGER,
    attributes: DataTypes.JSON,
    status: DataTypes.BOOLEAN
  }, {});
  stapleProductSync.associate = function(models) {
    // associations can be defined here
  };
  return stapleProductSync;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


/**
 * End Database Read and Write
 */