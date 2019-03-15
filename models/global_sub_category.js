'use strict';
module.exports = (sequelize, DataTypes) => {
  var globalSubCategory = sequelize.define('global_sub_category', {
    global_sub_category_name: DataTypes.STRING,
    global_category_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  globalSubCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalSubCategory;
};