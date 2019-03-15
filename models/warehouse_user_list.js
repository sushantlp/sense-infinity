'use strict';
module.exports = (sequelize, DataTypes) => {
  var warehouseUserList = sequelize.define('warehouse_user_list', {
    warehouse_user_id: DataTypes.INTEGER,
    warehouse_role_id: DataTypes.INTEGER,
    warehouse_employe_id: DataTypes.INTEGER,
    partner_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseUserList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseUserList;
};