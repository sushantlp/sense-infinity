'use strict';
module.exports = (sequelize, DataTypes) => {
  var store_counter = sequelize.define('store_counter', {
    store_counter_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  store_counter.associate = function(models) {
    // associations can be defined here
  };
  return store_counter;
};