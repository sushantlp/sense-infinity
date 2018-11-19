/**
 * Database Connection
 */

"use strict";

// Import
const mysql = require("mysql2/promise");
const Sequelize = require("sequelize");
const moment = require("moment-timezone");

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

// Sequelize Connection
module.exports.sequelizeConnection = () => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
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
        charset: "utf8mb4"
      },
      define: {
        underscored: false,
        freezeTableName: false,
        timestamps: true
      }
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

/**
 * Start Database Read and Write
 */

// Create Merchant Constant Store Table
module.exports.createConstantTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showConstantTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readConstantRecord = async (
  select,
  merchantMobile,
  storeId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readConstantRecordName = async (
  select,
  merchantMobile,
  storeId,
  name,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.keepMerchantConstantTable = async (
  merchantMobile,
  storeId,
  name,
  value,
  comment,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `INSERT INTO ${MerchantConstant} (name, value, comment, status, created_at, updated_at) VALUES (?,?,?,?,?,?)`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      name,
      value,
      comment,
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

// Update Constant Record
module.exports.updateMerchantConstantTable = async (
  merchantMobile,
  storeId,
  constantId,
  value,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const MerchantConstant = `${merchantMobile}_${storeId}_constants`;

    // Query
    const query = `UPDATE ${MerchantConstant} SET value = ?, status = ?, updated_at = ? WHERE constant_id = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      value,
      status,
      now,
      constantId
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Merchant Feedback Question Table Exist
module.exports.showFeedbackQuestionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showFeedbackOptionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showKeepFeedbackTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_merchant_feedbacks`;

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
module.exports.createFeedbackStoreTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_merchant_feedbacks`;
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${KeepFeedback} (keep_feed_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, feed_ques_id INTEGER NOT NULL, feed_option_id INTEGER NOT NULL, cust_identity_id INT(11) UNSIGNED NOT NULL, FOREIGN KEY (cust_identity_id) REFERENCES ${CustomerIdentity} (cust_identity_id), role_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(keep_feed_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Feedback Question Table
module.exports.createFeedbackQuestionTable = async (
  merchantMobile,
  storeId
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.createFeedbackOptionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readFeedbackQuestion = async (
  merchantMobile,
  storeId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readFeedbackOption = async (
  merchantMobile,
  storeId,
  quesId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showSurveyQuestionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showSurveyOptionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.showKeepSurveyTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_merchant_surveys`;

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
module.exports.createSurveyStoreTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_merchant_surveys`;
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${KeepSurvey} (keep_survey_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, survey_ques_id INTEGER NOT NULL, survey_option_id INTEGER NOT NULL, cust_identity_id INT(11) UNSIGNED NOT NULL, FOREIGN KEY (cust_identity_id) REFERENCES ${CustomerIdentity} (cust_identity_id), role_id INTEGER NOT NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(keep_survey_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Merchant Survey Question Table
module.exports.createSurveyQuestionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.createSurveyOptionTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readSurveyQuestion = async (merchantMobile, storeId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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
module.exports.readSurveyOption = async (
  select,
  merchantMobile,
  storeId,
  quesId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

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

// Create Customer Identity Table
module.exports.createCustomerIdentityTable = async (
  merchantMobile,
  storeId
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${CustomerIdentity} (cust_identity_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) NULL, last_name VARCHAR(255) NULL, email VARCHAR(255) NULL, mobile VARCHAR(10) UNIQUE, dob VARCHAR(255) NULL, gender_id INTEGER NOT NULL DEFAULT 0, FOREIGN KEY (gender_id) REFERENCES genders (gender_id), married VARCHAR(255) NULL DEFAULT 0, spouse_name VARCHAR(255) NULL, anniversary_date VARCHAR(255) NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(cust_identity_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Customer Identity Address Table
module.exports.createCustomerAddressTable = async (merchantMobile, storeId) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;
    const CustomerAddress = `${merchantMobile}_${storeId}_customer_identity_address`;

    // Query
    const query = `CREATE TABLE IF NOT EXISTS ${CustomerAddress} (cust_address_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, address_one VARCHAR(255) NULL, address_two VARCHAR(255) NULL, address_three VARCHAR(255) NULL, landmark VARCHAR(255) NULL, city_id INTEGER NOT NULL, FOREIGN KEY (city_id) REFERENCES cities (city_id), locality_id INTEGER NOT NULL, FOREIGN KEY (locality_id) REFERENCES localities (locality_id), cust_identity_id INT(11) UNSIGNED NOT NULL, FOREIGN KEY (cust_identity_id) REFERENCES ${CustomerIdentity} (cust_identity_id), status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(cust_address_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Customer Idenitity Record
module.exports.readCustomerIdentityRecord = async (
  merchantMobile,
  storeId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `SELECT ${CustomerIdentity}.cust_identity_id, ${CustomerIdentity}.first_name, ${CustomerIdentity}.last_name, ${CustomerIdentity}.email, ${CustomerIdentity}.mobile, ${CustomerIdentity}.dob, ${CustomerIdentity}.married, ${CustomerIdentity}.spouse_name, ${CustomerIdentity}.anniversary_date, genders.name AS gender_name, customer_membership_cards.membership_card_number AS membership_card FROM ${CustomerIdentity} LEFT JOIN genders ON ${CustomerIdentity}.gender_id = genders.gender_id LEFT JOIN customer_membership_cards ON ${CustomerIdentity}.mobile = customer_membership_cards.customer_mobile WHERE ${CustomerIdentity}.status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Customer Identity By Mobile
module.exports.readCustomerIdentityByMobile = async (
  select,
  merchantMobile,
  storeId,
  customerMobile,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `SELECT ${select} FROM ${CustomerIdentity} WHERE status = ? AND mobile = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      status,
      customerMobile
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Customer Identity Record
module.exports.keepCustomerIdentity = async (
  merchantMobile,
  storeId,
  firstName,
  lastName,
  email,
  mobile,
  dob,
  genderId,
  married,
  spouseName,
  anniversaryDate,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `INSERT INTO ${CustomerIdentity} (first_name, last_name, email, mobile, dob, gender_id, married, spouse_name, anniversary_date, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      firstName,
      lastName,
      email,
      mobile,
      dob,
      genderId,
      married,
      spouseName,
      anniversaryDate,
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

// Update Merchant Customer Identity Record
module.exports.updateCustomerIdentity = async (
  merchantMobile,
  storeId,
  firstName,
  lastName,
  email,
  mobile,
  dob,
  genderId,
  married,
  spouseName,
  anniversaryDate,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const CustomerIdentity = `${merchantMobile}_${storeId}_customer_identity`;

    // Query
    const query = `UPDATE ${CustomerIdentity} SET first_name = ?, last_name = ?, email = ?, dob = ?, gender_id = ?, married = ?, spouse_name = ?, anniversary_date = ?, status = ?, updated_at = ? WHERE mobile = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      firstName,
      lastName,
      email,
      dob,
      genderId,
      married,
      spouseName,
      anniversaryDate,
      status,
      now,
      mobile
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read One Record Merchant Store Survey
module.exports.readLimitMerchantSurvey = async (
  select,
  merchantMobile,
  storeId,
  customerId,
  questionId,
  roleId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_merchant_surveys`;

    // Query
    const query = `SELECT ${select} FROM ${KeepSurvey} WHERE cust_identity_id = ? AND survey_ques_id = ? AND role_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      customerId,
      questionId,
      roleId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read One Record Merchant Store Feedback
module.exports.readLimitMerchantFeedback = async (
  select,
  merchantMobile,
  storeId,
  customerId,
  questionId,
  roleId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_merchant_feedbacks`;

    // Query
    const query = `SELECT ${select} FROM ${KeepFeedback} WHERE cust_identity_id = ? AND feed_ques_id = ? AND role_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      customerId,
      questionId,
      roleId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Merchant Store Feedback Table
module.exports.keepMerchantFeedbackTable = async (
  merchantMobile,
  storeId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_merchant_feedbacks`;

    // Query
    const query = `INSERT INTO ${KeepFeedback} (feed_ques_id, feed_option_id, cust_identity_id, role_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;

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
module.exports.keepMerchantSurveyTable = async (
  merchantMobile,
  storeId,
  questionId,
  optionId,
  customerId,
  roleId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_merchant_surveys`;

    // Query
    const query = `INSERT INTO ${KeepSurvey} (survey_ques_id, survey_option_id, cust_identity_id, role_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;

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
module.exports.updateMerchantFeedbackTable = async (
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
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepFeedback = `${merchantMobile}_${storeId}_keep_merchant_feedbacks`;

    // Query
    const query = `UPDATE ${KeepFeedback} SET feed_ques_id = ?, feed_option_id = ?, cust_identity_id = ?, role_id = ?, status = ?, updated_at = ? WHERE keep_feed_id = ?`;

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
module.exports.updateMerchantSurveyTable = async (
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
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Dynamic Table
    const KeepSurvey = `${merchantMobile}_${storeId}_keep_merchant_surveys`;

    // Query
    const query = `UPDATE ${KeepSurvey} SET survey_ques_id = ?, survey_option_id = ?, cust_identity_id = ?, role_id = ?, status = ?, updated_at = ? WHERE keep_survey_id = ?`;

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
