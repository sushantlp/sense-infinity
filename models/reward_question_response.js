'use strict';
module.exports = (sequelize, DataTypes) => {
  var reward_question_response = sequelize.define('reward_question_response', {
    reward_question_id: DataTypes.INTEGER,
    reward_option_id: DataTypes.INTEGER,
    customer_information_id: DataTypes.INTEGER,
    question_response: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  reward_question_response.associate = function(models) {
    // associations can be defined here
  };
  return reward_question_response;
};