'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_information_list = sequelize.define('warehouse_information_list', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  warehouse_information_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_information_list;
};