"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var feedbackquestion = sequelize.define(
    "feedback_question",
    {
      feed_question: DataTypes.STRING,
      input_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  feedbackquestion.associate = function(models) {
    // associations can be defined here
  };
  return feedbackquestion;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Admin Feedback Question
module.exports.readAdminFeedbackQuestion = async (select, mobile, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM feedback_questions LEFT JOIN input_types ON feedback_questions.input_id=input_types.input_id LEFT JOIN merchants ON feedback_questions.category_id=merchants.category_id WHERE feedback_questions.status=? AND merchants.mobile=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status, mobile]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
