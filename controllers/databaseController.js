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

/**
 * End Database Read and Write
 */
