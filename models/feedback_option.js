'use strict';

const moment = require('moment-timezone');
const mysql = require('mysql2/promise');

module.exports = (sequelize, DataTypes) => {
  var feedbackOption = sequelize.define(
    'feedback_option',
    {
      option_value: DataTypes.STRING,
      feed_ques_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
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
module.exports.readAdminFeedbackOption = async (select, quesId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM feedback_options WHERE feed_ques_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [quesId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get Admin Feedback Option
// module.exports.getAdminFeedbackOption = (quesId, status) => {
//   // Query
//   const query =
//     "SELECT * FROM `FeedbackOptions` WHERE `feed_ques_id`=? AND `status`=?";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(query, [quesId, status], function(err, row) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(row);
//     });
//   });
// };

/**
 * End Database Read and Write
 */
