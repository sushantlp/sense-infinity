'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_counter = sequelize.define('store_counter', {
    firstName: DataTypes.STRING
  }, {});
  store_counter.associate = function(models) {
    // associations can be defined here
  };
  return store_counter;
};