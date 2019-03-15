'use strict';
module.exports = (sequelize, DataTypes) => {
  var apiKey = sequelize.define('api_key', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    api_name: DataTypes.STRING,
    key_prefix: DataTypes.STRING,
    api_key: DataTypes.STRING,
    rate_limit: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  apiKey.associate = function(models) {
    // associations can be defined here
  };
  return apiKey;
};