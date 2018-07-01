'use strict';
module.exports = (sequelize, DataTypes) => {
  var customerinfotrack = sequelize.define('customerinfotrack', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  customerinfotrack.associate = function(models) {
    // associations can be defined here
  };
  return customerinfotrack;
};