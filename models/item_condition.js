'use strict';
module.exports = (sequelize, DataTypes) => {
  var item_condition = sequelize.define('item_condition', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  item_condition.associate = function(models) {
    // associations can be defined here
  };
  return item_condition;
};