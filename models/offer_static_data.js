'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var offerStaticData = sequelize.define('offer_static_data', {
    offer_static_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  offerStaticData.associate = function(models) {
    // associations can be defined here
  };
  return offerStaticData;
};