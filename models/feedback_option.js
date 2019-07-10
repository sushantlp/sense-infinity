'use strict';

// Import Package
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var feedbackOption = sequelize.define(
    'feedback_option', {
      option_value: DataTypes.STRING,
      feed_ques_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    }, {}
  );
  feedbackOption.associate = function(models) {
    // associations can be defined here
  };
  return feedbackOption;
};

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Admin Feedback Option
module.exports.readAdminFeedbackOption = async(select, quesId, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM feedback_options WHERE feed_ques_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [quesId, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */