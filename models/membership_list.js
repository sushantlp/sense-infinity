'use strict';
module.exports = (sequelize, DataTypes) => {
  var membership_list = sequelize.define('membership_list', {
    membership_code: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  membership_list.associate = function(models) {
    // associations can be defined here
  };
  return membership_list;
};