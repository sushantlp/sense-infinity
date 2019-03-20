'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var storeCounter = sequelize.define('store_counter', {
    store_counter_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  storeCounter.associate = function(models) {
    // associations can be defined here
  };
  return storeCounter;
};