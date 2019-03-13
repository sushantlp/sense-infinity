'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_user_list = sequelize.define('warehouse_user_list', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  warehouse_user_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_user_list;
};