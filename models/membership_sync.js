'use strict';
module.exports = (sequelize, DataTypes) => {
  var membership_sync = sequelize.define('membership_sync', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  membership_sync.associate = function(models) {
    // associations can be defined here
  };
  return membership_sync;
};