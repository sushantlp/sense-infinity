'use strict';
module.exports = (sequelize, DataTypes) => {
  var global_category = sequelize.define('global_category', {
    global_category_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  global_category.associate = function(models) {
    // associations can be defined here
  };
  return global_category;
};