'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouse_employee_list = sequelize.define('warehouse_employee_list', {
    warehouse_employe_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    gender_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  warehouse_employee_list.associate = function(models) {
    // associations can be defined here
  };
  return warehouse_employee_list;
};