'use strict';
module.exports = (sequelize, DataTypes) => {
  var invoice = sequelize.define('invoice', {
    firstName: DataTypes.STRING
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
  };
  return invoice;
};