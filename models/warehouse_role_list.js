'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_role_list = sequelize.define('warehouse_role_list', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  warehouse_role_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_role_list;
};