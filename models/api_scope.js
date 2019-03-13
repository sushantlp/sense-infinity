'use strict';
module.exports = (sequelize, DataTypes) => {
  var api_scope = sequelize.define('api_scope', {
    api_id: DataTypes.INTEGER,
    scope_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  api_scope.associate = function(models) {
    // associations can be defined here
  };
  return api_scope;
};