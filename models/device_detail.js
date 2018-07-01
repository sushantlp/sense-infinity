'use strict';
module.exports = (sequelize, DataTypes) => {
  var device_detail = sequelize.define('device_detail', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  device_detail.associate = function(models) {
    // associations can be defined here
  };
  return device_detail;
};