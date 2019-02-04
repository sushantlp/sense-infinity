'use strict';
module.exports = (sequelize, DataTypes) => {
  var customerRewardQuestion = sequelize.define('customer_reward_question', {
    reward_question: DataTypes.STRING,
    input_id: DataTypes.INTEGER,
    reward_gift: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  customer_reward_question.associate = function(models) {
    // associations can be defined here
  };
  return customerRewardQuestion;
};