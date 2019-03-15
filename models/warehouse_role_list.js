'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouseRoleList = sequelize.define('warehouse_role_list', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseRoleList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseRoleList;
};