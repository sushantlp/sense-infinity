'use strict';
module.exports = (sequelize, DataTypes) => {
  var login_history = sequelize.define('login_history', {
    firstName: DataTypes.STRING
  }, {});
  login_history.associate = function(models) {
    // associations can be defined here
  };
  return login_history;
};