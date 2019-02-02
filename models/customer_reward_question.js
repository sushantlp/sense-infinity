'use strict';
module.exports = (sequelize, DataTypes) => {
  var customer_reward_question = sequelize.define('customer_reward_question', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  customer_reward_question.associate = function(models) {
    // associations can be defined here
  };
  return customer_reward_question;
};