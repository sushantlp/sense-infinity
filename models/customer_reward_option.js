'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var customerRewardOption = sequelize.define('customer_reward_option', {
    option_value: DataTypes.STRING,
    reward_question_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  customer_reward_option.associate = function(models) {
    // associations can be defined here
  };
  return customerRewardOption;
};


/**
 * Start Database Read and Write
 */


// Read Reward Option List 
module.exports.readRewardOptionList = async(select, id, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM customer_reward_options WHERE reward_question_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [id, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */