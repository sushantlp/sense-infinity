"use strict";

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define(
    "user_role", {
      role_name: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return UserRole;
};