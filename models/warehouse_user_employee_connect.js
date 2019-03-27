'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouseUserEmployeeConnect = sequelize.define('warehouse_user_employee_connect', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseUserEmployeeConnect.associate = function(models) {
    // associations can be defined here
  };
  return warehouseUserEmployeeConnect;
};