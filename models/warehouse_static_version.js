'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_static_version = sequelize.define('warehouse_static_version', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  warehouse_static_version.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_static_version;
};