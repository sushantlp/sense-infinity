"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var city = sequelize.define(
    "city",
    {
      city_name: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  city.associate = function(models) {
    // associations can be defined here
  };
  return city;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

/**
 * End Database Read and Write
 */
