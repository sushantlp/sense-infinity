'use strict';
module.exports = (sequelize, DataTypes) => {
  var customer_information_track = sequelize.define('customer_information_track', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  customer_information_track.associate = function(models) {
    // associations can be defined here
  };
  return customer_information_track;
};