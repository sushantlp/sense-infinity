'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_employee_list = sequelize.define('warehouse_employee_list', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  warehouse_employee_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_employee_list;
};