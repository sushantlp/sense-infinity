'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var customerRewardQuestion = sequelize.define('customer_reward_question', {
    reward_question: DataTypes.STRING,
    input_id: DataTypes.INTEGER,
    reward_point: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  customer_reward_question.associate = function(models) {
    // associations can be defined here
  };
  return customerRewardQuestion;
};



/**
 * Start Database Read and Write
 */


// Read All Reward Question List 
module.exports.readRewardQuestionList = async(select, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM customer_reward_questions LEFT JOIN input_types ON customer_reward_questions.input_id = input_types.input_id WHERE customer_reward_questions.status = ? AND input_types.status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Reward Question  
module.exports.readRewardQuestion = async(select, questionId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM customer_reward_questions WHERE reward_question_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [questionId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */