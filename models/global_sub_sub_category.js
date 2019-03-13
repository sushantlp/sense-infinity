'use strict';
module.exports = (sequelize, DataTypes) => {
  var global_sub_sub_category = sequelize.define('global_sub_sub_category', {
    firstName: DataTypes.STRING
  }, {});
  global_sub_sub_category.associate = function(models) {
    // associations can be defined here
  };
  return global_sub_sub_category;
};