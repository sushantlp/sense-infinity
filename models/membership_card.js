"use strict";

// Import Config
const constants = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  var membershipCard = sequelize.define(
    "membership_card",
    {
      membership_card_number: DataTypes.BIGINT,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  membershipCard.associate = function(models) {
    // associations can be defined here
  };
  return membershipCard;
};
