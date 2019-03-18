'use strict';
module.exports = (sequelize, DataTypes) => {
  var membershipSync = sequelize.define('membership_sync', {
    partner_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    membership_start_id: DataTypes.INTEGER,
    membership_end_id: DataTypes.INTEGER,
    sync_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
  }, {});
  membershipSync.associate = function(models) {
    // associations can be defined here
  };
  return membershipSync;
};