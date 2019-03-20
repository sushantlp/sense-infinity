'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var apiScope = sequelize.define('api_scope', {
    api_key_id: DataTypes.INTEGER,
    scope_list_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  apiScope.associate = function(models) {
    // associations can be defined here
  };
  return apiScope;
};