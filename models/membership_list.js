'use strict';
module.exports = (sequelize, DataTypes) => {
  var membershipList = sequelize.define('membership_list', {
    membership_code: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {});
  membershipList.associate = function(models) {
    // associations can be defined here
  };
  return membershipList;
};