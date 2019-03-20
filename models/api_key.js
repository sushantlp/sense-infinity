'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var apiKey = sequelize.define('api_key', {
    user_id: DataTypes.INTEGER,
    api_name: DataTypes.STRING,
    key_prefix: DataTypes.STRING,
    api_key: DataTypes.STRING,
    rate_limit: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  apiKey.associate = function(models) {
    // associations can be defined here
  };
  return apiKey;
};



/**
 * Start Database Read and Write
 */


// Read Api Key
module.exports.readApiKey = async(select, prefix, key, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM api_keys WHERE key_prefix = ? AND api_key = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [prefix, key, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */