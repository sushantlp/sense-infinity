"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var survey_option = sequelize.define(
    "survey_option",
    {
      option_value: DataTypes.STRING,
      survey_ques_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  survey_option.associate = function(models) {
    // associations can be defined here
  };
  return survey_option;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

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
    const query = `SELECT ${select} FROM survey_options WHERE survey_ques_id=? AND status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get Admin Survey Option
// module.exports.getAdminSurveyOption = (quesId, status) => {
//   const query =
//     "SELECT * FROM `SurveyOptions` WHERE `survey_ques_id`=? AND `status`=?";

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
