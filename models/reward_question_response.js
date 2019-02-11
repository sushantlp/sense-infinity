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
  rewardQuestionResponse.associate = function(models) {
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


    if (response === undefined) response = connection.escape(response);


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

// Read All Reward Response by Question Id and Customer Id 
module.exports.readRewardResponse = async(select, questionId, customerId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM reward_question_responses WHERE reward_question_id = ? AND customer_information_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [questionId, customerId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Update Reward Response  
module.exports.updateRewardResponse = async(responseId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();


    // Query
    const query =
      "UPDATE `reward_question_responses` SET `status` = ?, `updated_at` = ? WHERE `question_response_id` = ?";

    // Query Database
    const [rows, fields] = await connection.execute(query, [status, now, responseId]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Reward Response By Question Id and Option Id
module.exports.updateResponseByOption = async(questionId, optionId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();


    // Query
    const query =
      "UPDATE `reward_question_responses` SET `status` = ?, `updated_at` = ? WHERE `reward_question_id` = ? AND `reward_option_id` = ?";

    // Query Database
    const [rows, fields] = await connection.execute(query, [status, now, questionId, optionId]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */