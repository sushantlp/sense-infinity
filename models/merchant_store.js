"use strict";
module.exports = (sequelize, DataTypes) => {
  var merchant_store = sequelize.define(
    "merchant_store",
    {
      merchant_id: DataTypes.INTEGER,
      store_name: DataTypes.STRING,
      address: DataTypes.TEXT,
      address_op1: DataTypes.TEXT,
      landmark: DataTypes.TEXT,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN,
      sense: DataTypes.BOOLEAN
    },
    {}
  );
  merchant_store.associate = function(models) {
    // associations can be defined here
  };
  return merchant_store;
};
