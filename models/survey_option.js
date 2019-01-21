'use strict';

const moment = require('moment-timezone');
const mysql = require('mysql2/promise');

module.exports = (sequelize, DataTypes) => {
  var surveyOption = sequelize.define(
    'survey_option',
    {
      option_value: DataTypes.STRING,
      survey_ques_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  surveyOption.associate = function(models) {
    // associations can be defined here
  };
  return surveyOption;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Admin Survey Option
module.exports.readAdminSurveyOption = async (select, quesId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM survey_options WHERE survey_ques_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
