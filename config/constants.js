'use strict';

// Module Dependencies.
const mysql = require('mysql2/promise');

// Constant String
module.exports.Gateway = {
  CLUB_CARD: 'Club-Card',
  POS: 'Point-of-Sale',
  INFINITY_REWARD: 'Infinity-Reward'
};

// Mail Information
module.exports.Mail = {
  MAIL_DRIVER: process.env.MAIL_DRIVER,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
};

// Create Mysql Connection
module.exports.createMysqlConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
};


module.exports.EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;