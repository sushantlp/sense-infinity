'use strict';
module.exports = (sequelize, DataTypes) => {
  var membership_card = sequelize.define('membership_card', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  membership_card.associate = function(models) {
    // associations can be defined here
  };
  return membership_card;
};