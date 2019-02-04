'use strict';
module.exports = (sequelize, DataTypes) => {
  var customerRewardOption = sequelize.define('customer_reward_option', {
    option_value: DataTypes.STRING,
    reward_question_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  customer_reward_option.associate = function(models) {
    // associations can be defined here
  };
  return customerRewardOption;
};