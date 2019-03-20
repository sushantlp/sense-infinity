'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var scopeList = sequelize.define('scope_list', {
    scope_name: DataTypes.STRING,
    scope_description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  scopeList.associate = function(models) {
    // associations can be defined here
  };
  return scopeList;
};