'use strict';

// Import Package 
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var rewardQuestionResponse = sequelize.define('reward_question_response', {
    reward_question_id: DataTypes.INTEGER,
    reward_option_id: DataTypes.INTEGER,
    customer_information_id: DataTypes.INTEGER,
    question_response: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {});
  reward_question_response.associate = function(models) {
    // associations can be defined here
  };
  return rewardQuestionResponse;
};


// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */


// Keep Question Reward Response
module.exports.keepRewardResponse = async(questionId, optionId, customerId, response, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();


    if (response === undefined) {
      response = connection.escape(response);
    }

    // Query
    const query =
      'INSERT INTO `reward_question_responses` (`reward_question_id`,`reward_option_id`,`customer_information_id`,`question_response`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)';

    // Query Database
    const row = await connection.execute(query, [
      questionId,
      optionId,
      customerId,
      response,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */