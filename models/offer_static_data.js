'use strict';
module.exports = (sequelize, DataTypes) => {
  var offer_static_data = sequelize.define('offer_static_data', {
    offer_static_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  offer_static_data.associate = function(models) {
    // associations can be defined here
  };
  return offer_static_data;
};