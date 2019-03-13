'use strict';
module.exports = (sequelize, DataTypes) => {
  var scope_list = sequelize.define('scope_list', {
    scope_name: DataTypes.STRING,
    scope_description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  scope_list.associate = function(models) {
    // associations can be defined here
  };
  return scope_list;
};