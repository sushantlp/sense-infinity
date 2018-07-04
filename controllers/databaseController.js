/**
 * Database Connection
 */

"use strict";

// Import
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");
const Sequelize = require("sequelize");
const bluebird = require("bluebird");
const moment = require("moment");

// Load Environment Variables from .env file.
dotEnv.load({ path: ".env" });

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
    const query = `CREATE TABLE IF NOT EXISTS '${MerchantConstant}' (constant_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, comment VARCHAR(255) NULL, status BOOL DEFAULT FALSE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(constant_id))`;

    // Query Database
    const [rows, fields] = await connection.execute(query);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Constant Table Exist
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
    const query = `SELECT ${select} FROM '${MerchantConstant}' WHERE name=? AND status=?`;

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
    const query = `INSERT INTO '${MerchantConstant}' ('name','value','comment','status','created_at','updated_at') VALUES (?,?,?,?,?,?)`;

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
    const query = `UPDATE '${MerchantConstant}' SET 'value'=?,'status'=?,'updated_at'=? WHERE 'constant_id'=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      value,
      status,
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
    const query = `CREATE TABLE IF NOT EXISTS '${KeepFeedback}' ('keep_feed_id' INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 'feed_ques_id' INTEGER NOT NULL,'feed_option_id' INTEGER NOT NULL,'cust_identity_id' INT(11) UNSIGNED NOT NULL, FOREIGN KEY ('cust_identity_id') REFERENCES '${CustomerIdentity}' ('cust_identity_id'), 'role_id' INTEGER NOT NULL,'status' BOOL DEFAULT FALSE,'created_at' DATETIME NOT NULL,'updated_at' DATETIME NOT NULL,PRIMARY KEY('keep_feed_id'))`;

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
    const query = `CREATE TABLE IF NOT EXISTS '${FeedbackQuestion}' ('feed_ques_id' INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 'feed_question' VARCHAR(255) NOT NULL, 'input_id' INTEGER NOT NULL, 'status' BOOL DEFAULT FALSE, 'created_at' DATETIME NOT NULL, 'updated_at' DATETIME NOT NULL, PRIMARY KEY('feed_ques_id'))`;

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
    const query = `CREATE TABLE IF NOT EXISTS '${FeedbackOption}' ('feed_option_id' INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 'option_value' VARCHAR(255) NOT NULL, 'feed_ques_id' INT(11) UNSIGNED NOT NULL, FOREIGN KEY ('feed_ques_id') REFERENCES '${FeedbackQuestion}' ('feed_ques_id'), 'status' BOOL DEFAULT FALSE, 'created_at' DATETIME NOT NULL, 'updated_at' DATETIME NOT NULL,PRIMARY KEY('feed_option_id'))`;

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
    const query = `SELECT '${FeedbackQuestion}'.feed_ques_id,'${FeedbackQuestion}'.feed_question,'${FeedbackQuestion}'.input_id,InputTypes.input_name FROM '${FeedbackQuestion}' LEFT JOIN 'InputTypes' ON '${FeedbackQuestion}'.input_id = InputTypes.input_id WHERE '${FeedbackQuestion}'.status = ?`;

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
