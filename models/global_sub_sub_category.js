'use strict';
module.exports = (sequelize, DataTypes) => {
  var globalSubSubCategory = sequelize.define('global_sub_sub_category', {
    global_sub_sub_category_name: DataTypes.STRING,
    global_sub_category_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  globalSubSubCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalSubSubCategory;
};