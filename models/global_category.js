'use strict';
module.exports = (sequelize, DataTypes) => {
  var globalCategory = sequelize.define('global_category', {
    global_category_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  globalCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalCategory;
};