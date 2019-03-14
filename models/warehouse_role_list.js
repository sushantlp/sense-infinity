'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_role_list = sequelize.define('warehouse_role_list', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouse_role_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_role_list;
};