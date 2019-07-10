'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var surveyQuestion = sequelize.define(
    'survey_question', {
      survey_question: DataTypes.STRING,
      input_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    }, {}
  );
  surveyQuestion.associate = function(models) {
    // associations can be defined here
  };
  return surveyQuestion;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Admin Survey Question
module.exports.readAdminSurveyQuestion = async(select, mobile, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM survey_questions LEFT JOIN input_types ON survey_questions.input_id = input_types.input_id LEFT JOIN partners ON survey_questions.category_id = partners.category_id WHERE survey_questions.status = ? AND partners.mobile = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status, mobile]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */