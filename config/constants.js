'use strict';

// Module Dependencies.
const mysql = require('mysql2/promise');

// Constant String
module.exports.gateway = {
  CLUB_CARD: 'Club-Card',
  POS: 'Point-of-Sale',
  INFINITY_REWARD: 'Infinity-Reward'
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