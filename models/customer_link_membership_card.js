"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer_link_membership_card = sequelize.define(
    "customer_link_membership_card",
    {
      customer_information_id: DataTypes.INTEGER.UNSIGNED,
      membership_card_id: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  customer_link_membership_card.associate = function(models) {
    // associations can be defined here
  };
  return customer_link_membership_card;
};
