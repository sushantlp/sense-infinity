"use strict";

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    "category", {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    }, {}
  );
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};