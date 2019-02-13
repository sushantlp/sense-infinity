/**
 * Database Connection
 */

'use strict';

// Import Package
const Sequelize = require('sequelize');
const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

// Current Date and Time
const now = moment()
  .tz('Asia/Kolkata')
  .format('YYYY-MM-DD HH-m-ss');

// Sequelize Connection
module.exports.sequelizeConnection = () => {
  const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER,
    operatorsAliases: false,
    pool: {
      max: 90,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      charset: 'utf8mb4'
    },
    define: {
      underscored: false,
      freezeTableName: false,
      timestamps: true
    }
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};

/**
 * Start Database Read and Write
 */

// Create Merchant Constant Store Table
module.exports.createConstantTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${MerchantConstant} (constant_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, comment VARCHAR(255) NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(constant_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Merchant Constant Table Exist
module.exports.showConstantTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `SHOW TABLES LIKE '${MerchantConstant}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Constant Record
module.exports.readConstantRecord = async(select, merchantMobile, storeId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `SELECT ${select} FROM ${MerchantConstant} WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Constant Record By Name
module.exports.readConstantRecordName = async(select, merchantMobile, storeId, name, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `SELECT ${select} FROM ${MerchantConstant} WHERE name = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [name, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Constant Table
module.exports.keepMerchantConstantTable = async(merchantMobile, storeId, name, value, comment, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `INSERT INTO ${MerchantConstant} (name, value, comment, status, created_at, updated_at) VALUES (?,?,?,?,?,?)`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [name, value, comment, status, now, now]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Constant Record
module.exports.updateMerchantConstantTable = async(merchantMobile, storeId, constantId, value, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `UPDATE ${MerchantConstant} SET value = ?, status = ?, updated_at = ? WHERE constant_id = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [value, status, now, constantId]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Merchant Feedback Question Table Exist
module.exports.showFeedbackQuestionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackQuestion = `${merchantMobile}_${storeId}_feedback_questions`;

    // Query
    const query = `SHOW TABLES LIKE '${FeedbackQuestion}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Merchant Feedback Option Table Exist
module.exports.showFeedbackOptionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackOption = `${merchantMobile}_${storeId}_feedback_options`;

    // Query
    const query = `SHOW TABLES LIKE '${FeedbackOption}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Merchant Keep Feedback Table Exist
module.exports.showKeepFeedbackTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_partner_feedbacks`;

    // Query
    const query = `SHOW TABLES LIKE '${KeepFeedback}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Feedback Store Table
module.exports.createFeedbackStoreTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_partner_feedbacks`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${KeepFeedback} (keep_feed_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, feed_ques_id INTEGER NOT NULL, feed_option_id INTEGER NOT NULL, customer_information_id INT(11) NOT NULL, FOREIGN KEY (customer_information_id) REFERENCES customer_information_data (customer_information_id), role_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(keep_feed_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Feedback Question Table
module.exports.createFeedbackQuestionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackQuestion = `${merchantMobile}_${storeId}_feedback_questions`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${FeedbackQuestion} (feed_ques_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, feed_question VARCHAR(255) NOT NULL, input_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(feed_ques_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Feedback Option Table
module.exports.createFeedbackOptionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackQuestion = `${merchantMobile}_${storeId}_feedback_questions`;
    const FeedbackOption = `${merchantMobile}_${storeId}_feedback_options`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${FeedbackOption} (feed_option_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, option_value VARCHAR(255) NOT NULL, feed_ques_id INT(11) UNSIGNED NOT NULL, FOREIGN KEY (feed_ques_id) REFERENCES ${FeedbackQuestion} (feed_ques_id), status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(feed_option_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Feedback Question Record
module.exports.readFeedbackQuestion = async(merchantMobile, storeId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackQuestion = `${merchantMobile}_${storeId}_feedback_questions`;

    // Query
    const query = `SELECT ${FeedbackQuestion}.feed_ques_id, ${FeedbackQuestion}.feed_question, ${FeedbackQuestion}.input_id, input_types.input_name FROM ${FeedbackQuestion} LEFT JOIN input_types ON ${FeedbackQuestion}.input_id = input_types.input_id WHERE ${FeedbackQuestion}.status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Feedback Option Record
module.exports.readFeedbackOption = async(merchantMobile, storeId, quesId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const FeedbackOption = `${merchantMobile}_${storeId}_feedback_options`;

    // Query
    const query = `SELECT * FROM ${FeedbackOption} WHERE feed_ques_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [quesId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Survey Question Table Exist
module.exports.showSurveyQuestionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyQuestion = `${merchantMobile}_${storeId}_survey_questions`;

    // Query
    const query = `SHOW TABLES LIKE '${SurveyQuestion}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Survey Option Table Exist
module.exports.showSurveyOptionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyOption = `${merchantMobile}_${storeId}_survey_options`;

    // Query
    const query = `SHOW TABLES LIKE '${SurveyOption}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Survey Table Exist
module.exports.showKeepSurveyTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_partner_surveys`;

    // Query
    const query = `SHOW TABLES LIKE '${KeepSurvey}'`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Survey Store Table
module.exports.createSurveyStoreTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_partner_surveys`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${KeepSurvey} (keep_survey_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, survey_ques_id INTEGER NOT NULL, survey_option_id INTEGER NOT NULL, customer_information_id INT(11) NOT NULL, FOREIGN KEY (customer_information_id) REFERENCES customer_information_data (customer_information_id), role_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(keep_survey_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Survey Question Table
module.exports.createSurveyQuestionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyQuestion = `${merchantMobile}_${storeId}_survey_questions`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${SurveyQuestion} (survey_ques_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, survey_question VARCHAR(255) NOT NULL, input_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(survey_ques_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Survey Option Table
module.exports.createSurveyOptionTable = async(merchantMobile, storeId) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyOption = `${merchantMobile}_${storeId}_survey_options`;
    const SurveyQuestion = `${merchantMobile}_${storeId}_survey_questions`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${SurveyOption} (survey_option_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, option_value VARCHAR(255) NOT NULL, survey_ques_id INT(11) UNSIGNED NOT NULL, FOREIGN KEY (survey_ques_id) REFERENCES ${SurveyQuestion} (survey_ques_id), status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(survey_option_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Survey Question Record
module.exports.readSurveyQuestion = async(merchantMobile, storeId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyQuestion = `${merchantMobile}_${storeId}_survey_questions`;

    // Query
    const query = `SELECT ${SurveyQuestion}.survey_ques_id, ${SurveyQuestion}.survey_question, ${SurveyQuestion}.input_id, input_types.input_name FROM ${SurveyQuestion} LEFT JOIN input_types ON ${SurveyQuestion}.input_id = input_types.input_id WHERE ${SurveyQuestion}.status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Survey Option Record
module.exports.readSurveyOption = async(select, merchantMobile, storeId, quesId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const SurveyOption = `${merchantMobile}_${storeId}_survey_options`;

    // Query
    const query = `SELECT ${select} FROM ${SurveyOption} WHERE survey_ques_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [quesId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read One Record Merchant Store Survey
module.exports.readLimitMerchantSurvey = async(
  select,
  merchantMobile,
  storeId,
  customerId,
  questionId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_partner_surveys`;

    // Query
    const query = `SELECT ${select} FROM ${KeepSurvey} WHERE customer_information_id = ? AND survey_ques_id = ? AND role_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [customerId, questionId, roleId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read One Record Merchant Store Feedback
module.exports.readLimitMerchantFeedback = async(
  select,
  merchantMobile,
  storeId,
  customerId,
  questionId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_partner_feedbacks`;

    // Query
    const query = `SELECT ${select} FROM ${KeepFeedback} WHERE customer_information_id = ? AND feed_ques_id = ? AND role_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [customerId, questionId, roleId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Store Feedback Table
module.exports.keepMerchantFeedbackTable = async(
  merchantMobile,
  storeId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_partner_feedbacks`;

    // Query
    const query = `INSERT INTO ${KeepFeedback} (feed_ques_id, feed_option_id, customer_information_id, role_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      questionId,
      optionId,
      customerId,
      roleId,
      status,
      now,
      now
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Store Survey Table
module.exports.keepMerchantSurveyTable = async(
  merchantMobile,
  storeId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_partner_surveys`;

    // Query
    const query = `INSERT INTO ${KeepSurvey} (survey_ques_id, survey_option_id, customer_information_id, role_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      questionId,
      optionId,
      customerId,
      roleId,
      status,
      now,
      now
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Merchant Store Feedback Table
module.exports.updateMerchantFeedbackTable = async(
  merchantMobile,
  storeId,
  keepFeedId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_partner_feedbacks`;

    // Query
    const query = `UPDATE ${KeepFeedback} SET feed_ques_id = ?, feed_option_id = ?, customer_information_id = ?, role_id = ?, status = ?, updated_at = ? WHERE keep_feed_id = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      questionId,
      optionId,
      customerId,
      roleId,
      status,
      now,
      keepFeedId
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Merchant Store Survey Table
module.exports.updateMerchantSurveyTable = async(
  merchantMobile,
  storeId,
  keepSurveyId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_partner_surveys`;

    // Query
    const query = `UPDATE ${KeepSurvey} SET survey_ques_id = ?, survey_option_id = ?, customer_information_id = ?, role_id = ?, status = ?, updated_at = ? WHERE keep_survey_id = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      questionId,
      optionId,
      customerId,
      roleId,
      status,
      now,
      keepSurveyId
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */